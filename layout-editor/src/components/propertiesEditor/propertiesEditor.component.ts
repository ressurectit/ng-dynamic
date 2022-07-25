import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Inject, Optional, Type, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Logger, LOGGER} from '@anglr/common';
import {FormModelBuilder} from '@anglr/common/forms';
import {addSimpleChange, MetadataHistoryManager} from '@anglr/dynamic';
import {LayoutComponent, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Dictionary, extend, isPresent, resolvePromiseOr} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {LayoutEditorMetadataExtractor, LayoutEditorMetadataManager, LayoutEditorPropertyMetadataExtractor} from '../../services';
import {LayoutDesignerSAComponent} from '../layoutDesigner/layoutDesigner.component';
import {LayoutEditorMetadataDescriptor, LayoutPropertyTypeData} from '../../decorators';
import {PropertiesControlsModule} from '../../modules';
import {LayoutEditorPropertyMetadata} from '../../misc/types';
import {PropertiesControl} from '../../interfaces';
import {LAYOUT_HISTORY_MANAGER} from '../../misc/tokens';

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
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesEditorSAComponent implements OnInit, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Subscriptions created during initialization
     */
    protected _initSubscriptions: Subscription = new Subscription();

    /**
     * Subscription for options form
     */
    protected _optionsFormSubscription: Subscription|null = null;

    //######################### protected properties - template bindings #########################

    /**
     * Indication whether are properties visible
     */
    protected _visible: boolean = false;

    /**
     * Instance of selected designer component
     */
    protected _component: LayoutDesignerSAComponent|null = null;

    /**
     * Instance of metadata for selected designed component
     */
    protected _metadata: LayoutEditorMetadataDescriptor|null = null;

    /**
     * Control for display name of component
     */
    protected _displayName: FormControl<string|null> = new FormControl<string|null>(null);

    /**
     * Properties data for editation
     */
    protected _propertiesData: PropertiesEditorData[] = [];

    //######################### constructor #########################
    constructor(protected _manager: LayoutEditorMetadataManager,
                protected _metadataExtractor: LayoutEditorMetadataExtractor,
                protected _propertyExtractor: LayoutEditorPropertyMetadataExtractor,
                protected _formModelBuilder: FormModelBuilder,
                protected _changeDetector: ChangeDetectorRef,
                @Inject(LAYOUT_HISTORY_MANAGER) protected history: MetadataHistoryManager<LayoutComponentMetadata>,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._initSubscriptions.add(this._manager.layoutChange.subscribe(() => this._initProperties()));
        this._initSubscriptions.add(this._manager.selectedChange.subscribe(() => this._initProperties()));

        this._displayName
            .valueChanges
            .subscribe(async displayName =>
            {
                if(this._component?.options?.typeMetadata && isPresent(displayName))
                {
                    this._component.options.typeMetadata.displayName = displayName;

                    const changes: SimpleChanges = {};
                    addSimpleChange<LayoutComponent>(changes, 'options', this._component.options, this._component.options);

                    // eslint-disable-next-line no-self-assign
                    this._component.options = this._component.options;
                    await resolvePromiseOr(this._component.ngOnChanges?.(changes));
                    this._manager.displayNameUpdated();
                    this.history.getNewState();
                }
            });

        this._initProperties();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this._initSubscriptions.unsubscribe();
        this._optionsFormSubscription?.unsubscribe();
        this._optionsFormSubscription = null;
    }

    //######################### protected methods #########################

    /**
     * Initialize properties for selected component
     */
    protected async _initProperties(): Promise<void>
    {
        if(isPresent(this._manager.selectedComponent))
        {
            this._visible = true;
            const component = this._manager.getComponent(this._manager.selectedComponent);

            if(component)
            {
                this._visible = true;
                this._component = component;

                await this._getMetadata();
            }
            else
            {
                this._hide();
            }
        }
        else
        {
            this._hide();
        }
    }

    /**
     * Gets metadta for selected component
     */
    protected async _getMetadata(): Promise<void>
    {
        if(this._component?.options?.typeMetadata)
        {
            this._displayName.setValue(this._component.options.typeMetadata.displayName || this._component.options.typeMetadata.id, {emitEvent: false});

            this._metadata = await this._metadataExtractor.extractMetadata(this._component.options?.typeMetadata);

            if(!this._metadata)
            {
                this._logger?.error('PropertiesEditorSAComponent: unable to get metadata {@source}', {package: this._component.options?.typeMetadata.package, name: this._component.options?.typeMetadata.name});

                this._hide();
            }

            this._optionsFormSubscription?.unsubscribe();
            this._optionsFormSubscription = new Subscription();
            this._propertiesData = [];

            //properties metadata
            if(this._metadata?.metaInfo?.optionsMetadata?.propertiesMetadata?.length)
            {
                for(const props of this._metadata?.metaInfo?.optionsMetadata?.propertiesMetadata)
                {
                    const form = this._formModelBuilder.build(new props.modelType(this._component?.options?.typeMetadata.options));
                    const metadata = this._propertyExtractor.extract(props.modelType);
    
                    this._optionsFormSubscription.add(form.valueChanges.subscribe(async data =>
                    {
                        if(this._component?.options?.typeMetadata)
                        {
                            extend(true, this._component.options.typeMetadata.options, data);

                            const changes: SimpleChanges = {};
                            addSimpleChange<LayoutComponent>(changes, 'options', this._component.options, this._component.options);
    
                            // eslint-disable-next-line no-self-assign
                            this._component.options = this._component.options;
                            await resolvePromiseOr(this._component.ngOnChanges?.(changes));
                            this._component.invalidateVisuals();
                            this.history.getNewState();
                        }
                    }));

                    this._propertiesData.push(
                    {
                        form,
                        metadata,
                        controls: props.propertiesControls,
                    });
                }
            }

            if(this._component)
            {
                const parent = this._manager.getParent(this._component.id);

                //gets parent metadata
                if(parent?.options?.typeMetadata)
                {
                    const parentMetadata = await this._metadataExtractor.extractMetadata(parent.options?.typeMetadata);
                    
                    //parent extensions properties metadata
                    if(parentMetadata?.metaInfo?.optionsMetadata?.childPropertiesMetadata?.length)
                    {
                        for(const props of parentMetadata?.metaInfo?.optionsMetadata?.childPropertiesMetadata)
                        {
                            const form = this._formModelBuilder.build(new props.modelType(this._component?.options?.typeMetadata.options));
                            const metadata = this._propertyExtractor.extract(props.modelType);
            
                            this._optionsFormSubscription.add(form.valueChanges.subscribe(async data =>
                            {
                                if(this._component?.options?.typeMetadata)
                                {
                                    extend(true, this._component.options.typeMetadata.options, data);
            
                                    const changes: SimpleChanges = {};
                                    addSimpleChange<LayoutComponent>(changes, 'options', this._component.options, this._component.options);

                                    // eslint-disable-next-line no-self-assign
                                    this._component.options = this._component.options;
                                    await resolvePromiseOr(this._component.ngOnChanges?.(changes));
                                    this._component.invalidateVisuals();
                                    this.history.getNewState();
                                }
                            }));
        
                            this._propertiesData.push(
                            {
                                form,
                                metadata,
                                controls: props.propertiesControls,
                            });
                        }
                    }
                }
            }
        }
        else
        {
            this._hide();
        }

        this._changeDetector.detectChanges();
    }

    /**
     * Hides properties
     */
    protected _hide(): void
    {
        this._visible = false;
        this._component = null;
        this._metadata = null;
        this._propertiesData = [];
        this._optionsFormSubscription?.unsubscribe();
        this._optionsFormSubscription = null;
        this._changeDetector.detectChanges();
    }
}