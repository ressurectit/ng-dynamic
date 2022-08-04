import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {ComponentStylingModel, ComponentStylingPropertiesControlComponent, genericPropertiesControlFor, LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '@anglr/dynamic/layout-editor';
import {Action, Func} from '@jscrpt/common';

import {FormComponentControlType} from '../../../misc/enums';
import {FormGroupComponentOptions} from '../formGroup.options';
import {FormGroupModel} from './formGroup.model';

/**
 * Form group layout metadata
 */
export class FormGroupLayoutEditorMetadata implements LayoutEditorMetadataDescriptor<FormGroupComponentOptions>
{
    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo =
    {
        name: 'Form group',
        description: 'Form group',
        group: 'Layout',
        optionsMetadata:
        {
            propertiesMetadata:
            [
                {
                    modelType: ComponentStylingModel,
                    propertiesControls: 
                    [
                        ComponentStylingPropertiesControlComponent,
                    ],
                },
                {
                    modelType: FormGroupModel,
                    propertiesControls: 
                    [
                        genericPropertiesControlFor(['controlName'])
                    ],
                },
            ]
        },
        defaultOptions:
        {
            controlType: FormComponentControlType.FormGroup
        }
    };

    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, FormGroupComponentOptions, number]> = (metadata, options, index) =>
    {
        options.children ??= [];
        options.children.splice(index, 0, metadata);
    };

    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [FormGroupComponentOptions|undefined|null]> = () => true;

    /**
     * @inheritdoc
     */
    public getDescendants?: Func<LayoutComponentMetadata[], [FormGroupComponentOptions|undefined|null]> = options => options?.children ?? [];

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, FormGroupComponentOptions]> = (id, options) =>
    {
        options.children ??= [];
        const index = options.children.findIndex(itm => itm.id === id);
        options.children.splice(index, 1);
    }

    //######################### constructor #########################
    constructor()
    {
        Object.freeze(this);
    }
}