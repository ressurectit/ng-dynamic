import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormModelBuilder} from '@anglr/common/forms';
import {LOGGER, Logger} from '@anglr/common';
import {LayoutComponentsIteratorService, LayoutEditorMetadataExtractor, LayoutPropertiesModelType, PropertiesControl, PropertiesControlBase, PropertiesControlsModule} from '@anglr/dynamic/layout-editor';
import {TitledDialogService} from '@anglr/common/material';
import {MetadataStorage} from '@anglr/dynamic';
import {LayoutComponentMetadata, LAYOUT_METADATA_STORAGE} from '@anglr/dynamic/layout';
import {Dictionary, extend} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {CustomComponentComponentOptions} from '../../../customComponent.options';
import {ContentOptionsSelectionSAComponent} from '../contentOptionsSelection/contentOptionsSelection.component';
import {ContentComponentData, ContentOptionsSelectionData} from '../contentOptionsSelection/contentOptionsSelection.interface';
import {GetControlsSAPipe} from '../../pipes/getControls/getControls.pipe';
import {PropertiesMetadataSAPipe} from '../../pipes/propertiesMetadata/propertiesMetadata.pipe';
import {GetModelSAPipe} from '../../pipes/getModel/getModel.pipe';

/**
 * Component used for displaying editation of content options
 */
@Component(
{
    selector: 'content-options',
    templateUrl: 'contentOptionsPropertiesControl.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        GetControlsSAPipe,
        GetModelSAPipe,
        PropertiesControlsModule,
        PropertiesMetadataSAPipe,
    ],
    providers:
    [
        FormModelBuilder,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentOptionsPropertiesControlSAComponent extends PropertiesControlBase<CustomComponentComponentOptions> implements PropertiesControl<CustomComponentComponentOptions>
{
    //######################### protected properties #########################

    /**
     * Instance of titled dialog service
     */
    protected dialogSvc: TitledDialogService = inject(TitledDialogService);

    /**
     * Storage for layout metadata
     */
    protected layoutMetadataStorage: MetadataStorage<LayoutComponentMetadata> = inject(LAYOUT_METADATA_STORAGE);

    /**
     * Service used for obtaining iterators that goes over all components in metadata
     */
    protected layoutMetadataIterator: LayoutComponentsIteratorService = inject(LayoutComponentsIteratorService);

    /**
     * Extractor for obtaining layout metadata for components
     */
    protected metadataExtractor: LayoutEditorMetadataExtractor = inject(LayoutEditorMetadataExtractor);

    /**
     * Instance of logger used for logging
     */
    protected logger: Logger = inject(LOGGER);

    /**
     * Form model builder
     */
    protected formModelBuilder: FormModelBuilder = inject(FormModelBuilder);

    /**
     * Metadata for each component in custom component
     */
    protected customComponentContentMetadata: Dictionary<ContentComponentData> = {};

    /**
     * Custom component layout metadata
     */
    protected customComponentMetadata: LayoutComponentMetadata|undefined|null;

    /**
     * Represents components that have custom options and what properties are set
     */
    protected usedComponents: Dictionary<string[]> = {};

    /**
     * Stores components and their form groups
     */
    protected usedComponentsForms: Dictionary<Dictionary<FormGroup>> = {};

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override async _initialize(): Promise<void>
    {
        if(!this.form)
        {
            return;
        }

        const options: Partial<CustomComponentComponentOptions> = this.form.value;
        const name = options.name ?? '';
        this.usedComponents = options.usedComponents ?? {};

        this.customComponentMetadata = await this.layoutMetadataStorage.getMetadata(name);

        if(!this.customComponentMetadata)
        {
            this.logger.warn('ContentOptionsPropertiesControlSAComponent: missing layout metadata for custom component!');

            return;
        }

        const iterator = this.layoutMetadataIterator.getIteratorFor(this.customComponentMetadata);

        for await(const component of iterator)
        {
            const metadata = await this.metadataExtractor.extractMetadata(component.metadata);

            if(!metadata)
            {
                this.logger.warn('ContentOptionsPropertiesControlSAComponent: missing metadata for component!');

                continue;
            }

            this.customComponentContentMetadata[component.metadata.id] =
            {
                metadata: component.metadata,
                editorMetadata: metadata,
            };
        }

        for(const id in this.usedComponents)
        {
            if(!this.customComponentContentMetadata[id])
            {
                delete this.usedComponents[id];
                this.form?.controls.usedComponents.setValue(this.usedComponents);
            }
        }

        this.initForms();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Opens dialog for options selection
     */
    protected async showOptionsSelection(): Promise<void>
    {
        const result = await lastValueFrom(this.dialogSvc.open<ContentOptionsSelectionSAComponent, ContentOptionsSelectionData, Dictionary<string[]>|undefined|null>(ContentOptionsSelectionSAComponent,
        {
            title: 'content options selection',
            width: '75vw',
            data:
            {
                customComponentContentMetadata: this.customComponentContentMetadata,
                usedComponents: this.usedComponents,
            }
        }).afterClosed());

        if(result)
        {
            this.usedComponents = result;
            this.form?.controls.usedComponents.setValue(result);

            this.initForms();

            this._changeDetector.detectChanges();
        }
    }

    //######################### protected methods #########################

    /**
     * Initialize forms for properties
     */
    protected initForms(): void
    {
        this.usedComponentsForms = {};

        for(const cmpId in this.usedComponents)
        {
            const models = this.usedComponents[cmpId]
                .map(modelName => this.customComponentContentMetadata[cmpId]?.editorMetadata.metaInfo?.optionsMetadata?.propertiesMetadata?.find(itm => itm.modelType.name == modelName)?.modelType)
                .filter(itm => !!itm) as LayoutPropertiesModelType[];

            for(const model of models)
            {
                const options = extend(true,
                                       {},
                                       this.customComponentContentMetadata[cmpId]?.editorMetadata.metaInfo?.defaultOptions,
                                       this.customComponentContentMetadata[cmpId]?.metadata.options,
                                       this.form?.controls.contentOptions.value[cmpId]);

                this.usedComponentsForms[cmpId] ??= {};
                const form = this.usedComponentsForms[cmpId][model.name] = this.formModelBuilder
                    .build(new model(options));

                form.valueChanges.subscribe(value =>
                {
                    const currentOpts = this.form?.controls.contentOptions.value ?? {};
                    currentOpts[cmpId] ??= {};

                    extend(currentOpts[cmpId], value);

                    this.form?.controls.contentOptions.patchValue(currentOpts);
                });
            }
        }
    }
}
