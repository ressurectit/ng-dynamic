import {DefaultKnownPropertyTypes, LayoutPropertyDescription, LayoutPropertyName, LayoutPropertyType} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {DialogMetadataSelectorComponentOptions} from '../dialogMetadataSelector.options';

/**
 * Dialog metadata selector model for properties editor
 */
export class DialogMetadataSelectorModel implements DialogMetadataSelectorComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Storage name')
    @LayoutPropertyDescription('Name of storage storing current metadata status')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public storageName: string|undefined|null = null;

    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Show metadata button')
    @LayoutPropertyDescription('Indication whether is button for showing metadata selection visible')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputBoolean')
    public showButtonVisible: boolean = true;
    
    //######################### constructor #########################
    constructor(value: DialogMetadataSelectorComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}