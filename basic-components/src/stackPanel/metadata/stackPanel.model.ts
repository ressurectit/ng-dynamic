import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {ComponentStylingModel, DefaultKnownPropertyTypes, ForFormModel, LayoutPropertyDescription, LayoutPropertyMetadata, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {MetadataClassMixin} from '@anglr/dynamic';
import {mapValuesToThis} from '@jscrpt/common';

import {StackPanelComponentOptions} from '../stackPanel.options';

/**
 * Stack panel model for properties editor
 */
@MetadataClassMixin(ComponentStylingModel, [LayoutPropertyMetadata])
export class StackPanelModel implements ForFormModel<StackPanelComponentOptions>
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Horizontal')
    @LayoutPropertyDescription('Indication whether display stacked elements horizontally')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    horizontal: boolean|undefined|null = false;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Wrap')
    @LayoutPropertyDescription('Indication whether wrap children if there is not enough space')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    wrap: boolean|undefined|null = false;

    /**
     * @inheritdoc
     */
    children: LayoutComponentMetadata[]|undefined|null;

    //######################### constructor #########################
    constructor(value: StackPanelComponentOptions)
    {
        mapValuesToThis.bind(this)(value);
    }
}