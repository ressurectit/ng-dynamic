import {Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, Inject, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Logger, LOGGER} from '@anglr/common';
import {isPresent} from '@jscrpt/common';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {LayoutEditorMetadataExtractor, LayoutEditorMetadataManager} from '../../services';
import {LayoutDesignerSAComponent} from '../layoutDesigner/layoutDesigner.component';
import {LayoutEditorMetadataDescriptor} from '../../decorators';

/**
 * Component that represents editor for components options/properties
 */
@Component(
{
    selector: 'properties-editor',
    templateUrl: 'propertiesEditor.component.html',
    styleUrls: ['propertiesEditor.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
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
     * Control for id of component
     */
    protected _id: FormControl<string|null> = new FormControl<string|null>(null);

    //TODO: remove this only for testing
    protected _text: FormControl<string|null> = new FormControl<string|null>(null);

    //######################### constructor #########################
    constructor(protected _manager: LayoutEditorMetadataManager,
                protected _metadataExtractor: LayoutEditorMetadataExtractor,
                protected _changeDetector: ChangeDetectorRef,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._initSubscriptions.add(this._manager.selectedChange.subscribe(() => this._initProperties()));

        this._id
            .valueChanges
            .pipe(debounceTime(160))
            .subscribe(id =>
            {
                if(this._component?.options?.typeMetadata && isPresent(id))
                {
                    const oldId = this._component.options.typeMetadata.id;
                    this._component.options.typeMetadata.id = id;

                    // eslint-disable-next-line no-self-assign
                    this._component.options = this._component.options;
                    this._manager.updatedLayoutDesignerComponentId(oldId, id);
                }
            });

        this._text
            .valueChanges
            .pipe(debounceTime(160))
            .subscribe(text =>
            {
                if(this._component?.options?.typeMetadata && isPresent(text))
                {
                    const options = this._component.options.typeMetadata.options as any;
                    options.text = text;

                    // eslint-disable-next-line no-self-assign
                    this._component.options = this._component.options;
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
            this._id.setValue(this._component.options.typeMetadata.id, {emitEvent: false});
            this._text.setValue((this._component.options.typeMetadata.options as any).text, {emitEvent: false});

            this._metadata = await this._metadataExtractor.extractMetadata(this._component.options?.typeMetadata);

            if(!this._metadata)
            {
                this._logger?.error('PropertiesEditorSAComponent: unable to get metadata {@source}', {package: this._component.options?.typeMetadata.package, name: this._component.options?.typeMetadata.name});

                this._hide();
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
    }
}