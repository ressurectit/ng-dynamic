import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Inject, Optional, Type, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Logger, LOGGER, PermanentStorage, PERMANENT_STORAGE} from '@anglr/common';
import {FormModelBuilder} from '@anglr/common/forms';
import {addSimpleChange, MetadataHistoryManager} from '@anglr/dynamic';
import {LayoutComponent, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {DebounceCall, Dictionary, extend, isPresent, WithSync} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {LayoutEditorMetadataExtractor, LayoutEditorMetadataManager, LayoutEditorPropertyMetadataExtractor} from '../../services';
import {LayoutDesignerSAComponent} from '../layoutDesigner/layoutDesigner.component';
import {LayoutEditorMetadataDescriptor, LayoutEditorPropertiesDefinitionMetadata, LayoutPropertyTypeData} from '../../decorators';
import {PropertiesControlsModule} from '../../modules';
import {LayoutEditorPropertyMetadata} from '../../misc/types';
import {PropertiesControl} from '../../interfaces';
import {LAYOUT_HISTORY_MANAGER} from '../../misc/tokens';
import {WidthResizerSADirective} from '../../directives';

const PROPERTIES_EDITOR_STATE = 'PROPERTIES_EDITOR_STATE';

/**
 * State of properties editor
 */
interface PropertiesEditorState
{
    /**
     * Indication whether is properties editor opened
     */
    opened: boolean;

    /**
     * Current width of properties editor
     */
    width: number;
}

/**
 * Properties editor data
 */
interface PropertiesEditorData
{
    /**
     * Properties form
     */
    form: FormGroup;

    /**
     * Properties metadata
     */
    metadata: Dictionary<LayoutEditorPropertyMetadata&LayoutPropertyTypeData>|null;

    /**
     * Array of properties controls used for editation of properties/options
     */
    controls: Type<PropertiesControl>[];
}

/**
 * Component that represents editor for components options/properties
 */
@Component(
{
    selector: 'properties-editor',
    templateUrl: 'propertiesEditor.component.html',
    styleUrls: ['propertiesEditor.component.css'],
    providers: [FormModelBuilder],
    standalone: true,
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        PropertiesControlsModule,
        WidthResizerSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesEditorSAComponent implements OnInit, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Subscription for options form
     */
    protected optionsFormSubscription: Subscription|null = null;

    /**
     * Id of last component that was used for property editation
     */
    protected lastComponentId: string|null = null;

    /**
     * Instance of last component that was used for property editation
     */
    protected lastComponent: LayoutDesignerSAComponent|null = null;

    //######################### protected properties - template bindings #########################

    /**
     * Instance of selected designer component
     */
    protected component: LayoutDesignerSAComponent|null = null;

    /**
     * Instance of metadata for selected designed component
     */
    protected metadata: LayoutEditorMetadataDescriptor|null = null;

    /**
     * Control for display name of component
     */
    protected displayName: FormControl<string|null> = new FormControl<string|null>(null);

    /**
     * Properties data for editation
     */
    protected propertiesData: PropertiesEditorData[] = [];

    /**
     * Instance of properties editor state
     */
    protected state: PropertiesEditorState = {opened: false, width: 350};

    //######################### constructor #########################
    constructor(protected manager: LayoutEditorMetadataManager,
                protected metadataExtractor: LayoutEditorMetadataExtractor,
                protected propertyExtractor: LayoutEditorPropertyMetadataExtractor,
                protected formModelBuilder: FormModelBuilder,
                protected changeDetector: ChangeDetectorRef,
                @Inject(PERMANENT_STORAGE) protected storage: PermanentStorage,
                @Inject(LAYOUT_HISTORY_MANAGER) protected history: MetadataHistoryManager<LayoutComponentMetadata>,
                @Inject(LOGGER) @Optional() protected logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        const state = this.storage.get<PropertiesEditorState|null>(PROPERTIES_EDITOR_STATE);

        if(state)
        {
            this.state = state;
        }

        this.initSubscriptions.add(this.manager.layoutChange.subscribe(() => this.initProperties()));
        this.initSubscriptions.add(this.manager.selectedChange.subscribe(() => this.initProperties()));

        this.displayName
            .valueChanges
            .subscribe(async displayName =>
            {
                if(this.component?.options?.typeMetadata && isPresent(displayName))
                {
                    this.component.options.typeMetadata.displayName = displayName;

                    const changes: SimpleChanges = {};
                    addSimpleChange<LayoutComponent>(changes, 'options', this.component.options, this.component.options);

                    // eslint-disable-next-line no-self-assign
                    this.component.options = this.component.options;
                    await this.component.ngOnChanges?.(changes);
                    this.manager.displayNameUpdated();
                    this.history.getNewState();
                }
            });

        await this.initProperties();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
        this.optionsFormSubscription?.unsubscribe();
        this.optionsFormSubscription = null;
    }

    //######################### protected methods - template bindings #########################

    /**
     * Toggles collapsed state of properties
     */
    protected toggleCollapsed(): void
    {
        this.state.opened = !this.state.opened;

        this.storage.set(PROPERTIES_EDITOR_STATE, this.state);
    }

    protected updateSize(size: number): void
    {
        this.state.width -= size;

        this.storage.set(PROPERTIES_EDITOR_STATE, this.state);
        this.changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Initialize properties for selected component
     */
    @DebounceCall(10)
    @WithSync()
    protected async initProperties(): Promise<void>
    {
        if(isPresent(this.manager.selectedComponent))
        {
            const component = this.manager.getComponent(this.manager.selectedComponent);

            if(this.lastComponent == component && this.lastComponentId == this.manager.selectedComponent)
            {
                return;
            }
            
            this.lastComponent = component;
            this.lastComponentId = this.manager.selectedComponent;

            if(component)
            {
                this.component = component;

                await this.getMetadata();
            }
            else
            {
                this.hide();
            }
        }
        else
        {
            this.hide();
        }
    }

    /**
     * Gets metadta for selected component
     */
    protected async getMetadata(): Promise<void>
    {
        this.optionsFormSubscription?.unsubscribe();
        this.optionsFormSubscription = new Subscription();
        this.propertiesData = [];

        if(this.component?.options?.typeMetadata)
        {
            this.displayName.setValue(this.component.options.typeMetadata.displayName || this.component.options.typeMetadata.id, {emitEvent: false});

            this.metadata = await this.metadataExtractor.extractMetadata(this.component.options?.typeMetadata);

            if(!this.metadata)
            {
                this.logger?.error('PropertiesEditorSAComponent: unable to get metadata {@source}', {package: this.component.options?.typeMetadata.package, name: this.component.options?.typeMetadata.name});

                this.hide();
            }

            //properties metadata
            if(this.metadata?.metaInfo?.optionsMetadata?.propertiesMetadata?.length)
            {
                for(const props of this.metadata?.metaInfo?.optionsMetadata?.propertiesMetadata)
                {
                    this.initDynamicProperty(props);
                }
            }

            if(this.component)
            {
                const parent = this.manager.getParent(this.component.id);

                //gets parent metadata
                if(parent?.options?.typeMetadata)
                {
                    const parentMetadata = await this.metadataExtractor.extractMetadata(parent.options?.typeMetadata);
                    
                    //parent extensions properties metadata
                    if(parentMetadata?.metaInfo?.optionsMetadata?.childPropertiesMetadata?.length)
                    {
                        for(const props of parentMetadata?.metaInfo?.optionsMetadata?.childPropertiesMetadata)
                        {
                            this.initDynamicProperty(props);
                        }
                    }
                }
            }
        }
        else
        {
            this.hide();
        }

        this.changeDetector.detectChanges();
    }

    /**
     * Hides properties
     */
    protected hide(): void
    {
        this.lastComponent = null;
        this.lastComponentId = null;
        this.component = null;
        this.metadata = null;
        this.propertiesData = [];
        this.optionsFormSubscription?.unsubscribe();
        this.optionsFormSubscription = null;
        this.changeDetector.detectChanges();
    }

    /**
     * Initialize dynamic property
     * @param props - Property to be initialized
     */
    protected initDynamicProperty(props: LayoutEditorPropertiesDefinitionMetadata): void
    {
        const form = this.formModelBuilder.build(new props.modelType(this.component?.options?.typeMetadata.options));
        const metadata = this.propertyExtractor.extract(props.modelType);

        if(this.optionsFormSubscription)
        {
            this.optionsFormSubscription.add(form.valueChanges.subscribe(async data =>
            {
                if(this.component?.options?.typeMetadata)
                {
                    extend(true, this.component.options.typeMetadata.options, data);
    
                    const changes: SimpleChanges = {};
                    addSimpleChange<LayoutComponent>(changes, 'options', this.component.options, this.component.options);
    
                    // eslint-disable-next-line no-self-assign
                    this.component.options = this.component.options;
                    await this.component.ngOnChanges?.(changes);
                    this.component.invalidateVisuals();
                    this.history.getNewState();
                }
            }));
    
            this.propertiesData.push(
            {
                form,
                metadata,
                controls: props.propertiesControls,
            });
        }
    }
}