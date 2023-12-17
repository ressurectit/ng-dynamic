import {ChangeDetectionStrategy, Component, inject, Injector} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FormModelBuilder} from '@anglr/common/forms';
import {PropertiesControl, PropertiesControlBase, PropertiesControlsModule} from '@anglr/dynamic/layout-editor';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {Dictionary, extend} from '@jscrpt/common';

import {CustomComponentComponentOptions} from '../../../customComponent.options';
import {GetControlsSAPipe} from '../../pipes/getControls/getControls.pipe';
import {ContentComponentData} from '../../../../../components';
import {GetModelSAPipe, PropertiesMetadataSAPipe} from '../../../../../pipes';
import {getCustomComponentMeta} from '../../../../../misc/utils';
import {CustomComponentConfiguration, CustomComponentsRegister} from '../../../../../services';

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
export class ContentOptionsPropertiesControlSAComponent<TConfig extends CustomComponentConfiguration = CustomComponentConfiguration> extends PropertiesControlBase<CustomComponentComponentOptions> implements PropertiesControl<CustomComponentComponentOptions>
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
     * Instance of custom components register
     */
    protected customComponentsRegister: CustomComponentsRegister<TConfig> = inject(CustomComponentsRegister);

    /**
     * Metadata for each component in custom component
     */
    protected customComponentContentMetadata: Dictionary<ContentComponentData|undefined|null> = {};

    /**
     * Custom component layout metadata
     */
    protected customComponentMetadata: LayoutComponentMetadata|undefined|null;

    /**
     * Represents used properties
     */
    protected usedProperties: Dictionary<Dictionary<string[]>> = {};

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

        const configuration = this.customComponentsRegister.getConfigurationForComponent(name);

        if(!configuration)
        {
            return;
        }

        this.usedProperties = configuration.configurableProperties ?? {};

        for(const id in this.usedProperties)
        {
            if(!this.customComponentContentMetadata[id])
            {
                delete this.usedProperties[id];
            }

            //TODO: remove models that are not present in metadata, and also properties
            // for(const modelName in this.usedProperties[id])
            // {
            //     if(!this.customComponentContentMetadata[id]?.editorMetadata.metaInfo?.optionsMetadata?.propertiesMetadata)
            // }
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

        for(const cmpId in this.usedProperties)
        {
            for(const modelName in this.usedProperties[cmpId])
            {
                const model = this.customComponentContentMetadata[cmpId]?.editorMetadata.metaInfo?.optionsMetadata?.propertiesMetadata.find(itm => itm.modelType.name == modelName)?.modelType;
                const usedProperties = this.usedProperties[cmpId][modelName];

                if(!model)
                {
                    continue;
                }

                const options = extend(true,
                                       {},
                                       this.customComponentContentMetadata[cmpId]?.editorMetadata.metaInfo?.defaultOptions,
                                       this.customComponentContentMetadata[cmpId]?.metadata.options,
                                       this.form?.controls.contentOptions.value[cmpId]);

                this.usedComponentsForms[cmpId] ??= {};

                const modelInstance = new model(options);

                for(const property of Object.keys(modelInstance))
                {
                    //remove property if not used
                    if(usedProperties.indexOf(property) < 0)
                    {
                        delete modelInstance[property];
                    }
                }

                const form = this.usedComponentsForms[cmpId][modelName] = this.formModelBuilder
                    .build(modelInstance);

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
