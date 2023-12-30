import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {MetadataSelectorComponentOptions} from '../metadataSelector.options';

/**
 * Metadata selector model for properties editor
 */
export class MetadataSelectorModel implements MetadataSelectorComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public plugin: LayoutComponentMetadata|undefined|null;
    
    //######################### constructor #########################
    constructor(value: MetadataSelectorComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}