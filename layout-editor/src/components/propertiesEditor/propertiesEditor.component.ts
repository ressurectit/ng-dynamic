import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Inject, Type, SimpleChanges, Injector, inject} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Logger, LOGGER, PermanentStorage, PERMANENT_STORAGE, FirstUppercaseLocalizePipe} from '@anglr/common';
import {FormModelBuilder} from '@anglr/common/forms';
import {addSimpleChange, MetadataHistoryManager} from '@anglr/dynamic';
import {LayoutComponent, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {DebounceCall, Dictionary, isPresent, WithSync} from '@jscrpt/common';
import {extend} from '@jscrpt/common/extend';
import {Subscription, skip} from 'rxjs';
import {isEqual} from 'lodash-es';

import {LayoutEditorMetadataExtractor, LayoutEditorMetadataManager, LayoutEditorPropertyMetadataExtractor, LayoutEditorRenderer} from '../../services';
import {LayoutEditorMetadataDescriptor, LayoutEditorPropertiesDefinitionMetadata, LayoutPropertyTypeData} from '../../decorators';
import {PropertiesControlsModule} from '../../modules';
import {LayoutEditorPropertyMetadata} from '../../misc/types';
import {PropertiesControl} from '../../interfaces';
import {LAYOUT_HISTORY_MANAGER} from '../../misc/tokens';
import {LayoutDesignerDirective, WidthResizerDirective} from '../../directives';

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
    providers: [FormModelBuilder],
    imports:
    [
        ReactiveFormsModule,
        PropertiesControlsModule,
        WidthResizerDirective,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesEditorComponent implements OnInit, OnDestroy
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
    protected lastComponent: LayoutDesignerDirective|null = null;

    /**
     * Injector used for obtaining dependencies
     */
    protected injector: Injector = inject(Injector);

    //######################### protected properties - template bindings #########################

    /**
     * Instance of selected designer component
     */
    protected component: LayoutDesignerDirective|null = null;

    /**
     * Instance of current component options
     */
    protected componentOptions: unknown;

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
                protected layoutEditorRenderer: LayoutEditorRenderer,
                @Inject(PERMANENT_STORAGE) protected storage: PermanentStorage,
                @Inject(LAYOUT_HISTORY_MANAGER) protected history: MetadataHistoryManager<LayoutComponentMetadata>,
                @Inject(LOGGER) protected logger: Logger,)
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
        this.initSubscriptions.add(toObservable(this.manager.selectedComponent, {injector: this.injector})
            .pipe(skip(1))
            .subscribe(() => this.initProperties()));

        this.displayName
            .valueChanges
            .subscribe(async displayName =>
            {
                if(this.component?.metadataSafe && isPresent(displayName))
                {
                    this.component.updateDisplayName(displayName);
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

    /**
     * Updates size of properties
     * @param size - Size that was changed
     */
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
        const selectedComponent = this.manager.selectedComponent();

        if(isPresent(selectedComponent))
        {
            const component = this.manager.getComponent(selectedComponent);

            if(this.lastComponent == component && this.lastComponentId == selectedComponent)
            {
                return;
            }

            this.lastComponent = component;
            this.lastComponentId = selectedComponent;

            if(component)
            {
                this.component = component;
                this.componentOptions = {...this.component.metadataSafe.options as Record<string, unknown>};

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

        if(this.component?.metadataSafe)
        {
            this.displayName.setValue(this.component.metadataSafe.displayName || this.component.metadataSafe.id, {emitEvent: false});

            this.metadata = await this.metadataExtractor.extractMetadata(this.component.metadataSafe);

            if(!this.metadata)
            {
                this.logger.error('PropertiesEditorComponent: unable to get metadata {{@source}}', {source: {package: this.component.metadataSafe.package, name: this.component.metadataSafe.name}});

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
                const parent = this.manager.getParent(this.component.metadataSafe.id);

                //gets parent metadata
                if(parent?.metadataSafe)
                {
                    const parentMetadata = await this.metadataExtractor.extractMetadata(parent.metadataSafe);

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
        const form = this.formModelBuilder.build(new props.modelType(this.component?.metadataSafe.options));
        const metadata = this.propertyExtractor.extract(props.modelType);

        if(this.optionsFormSubscription)
        {
            this.optionsFormSubscription.add(form.valueChanges.subscribe(async data =>
            {
                if(this.component?.metadataSafe)
                {
                    //TODO: play with deepCopy!
                    // const originalOptions = deepCopyWithArrayOverride({}, this.component.metadataSafe.options);
                    // deepCopyWithArrayOverride(this.component.metadataSafe.options, data);
                    const originalOptions = extend(true, {}, this.component.metadataSafe.options);

                    extend(this.component.metadataSafe.options, extend(true, {}, data));

                    //options did not changed
                    if(isEqual(originalOptions, this.component.metadataSafe.options))
                    {
                        return;
                    }

                    //invalidate properties editor itself to have current value of options
                    this.componentOptions = {...this.component.metadataSafe.options as Record<string, unknown>};
                    this.changeDetector.detectChanges();

                    //options for component itself
                    const componentChanges: SimpleChanges = {};
                    addSimpleChange<LayoutComponent>(componentChanges, 'options', this.component.metadataSafe.options, originalOptions);

                    await this.component.componentSafe.instance.dynamicOnChanges?.(componentChanges);
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
