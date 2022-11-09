import {ChangeDetectionStrategy, Component, inject, Injector} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormModelBuilder} from '@anglr/common/forms';
import {LayoutPropertiesModelType, PropertiesControl, PropertiesControlBase, PropertiesControlsModule} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Dictionary, extend} from '@jscrpt/common';

import {CustomComponentComponentOptions} from '../../../customComponent.options';
import {GetControlsSAPipe} from '../../pipes/getControls/getControls.pipe';
import {ContentComponentData} from '../../../../../components';
import {GetModelSAPipe, PropertiesMetadataSAPipe} from '../../../../../pipes';
import {getCustomComponentMeta} from '../../../../../misc/utils';

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
        PropertiesControlsModule,
        GetControlsSAPipe,
        GetModelSAPipe,
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
     * Instance of injector for this component
     */
    protected injector: Injector = inject(Injector);

    /**
     * Form model builder
     */
    protected formModelBuilder: FormModelBuilder = inject(FormModelBuilder);

    /**
     * Metadata for each component in custom component
     */
    protected customComponentContentMetadata: Dictionary<ContentComponentData|undefined|null> = {};

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
        const result = (await getCustomComponentMeta(name, this.injector));

        if(!result)
        {
            return;
        }

        this.customComponentContentMetadata = result.contentMetadata;
        this.customComponentMetadata = result.metadata;

        this.usedComponents = options.usedComponents ?? {};

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
