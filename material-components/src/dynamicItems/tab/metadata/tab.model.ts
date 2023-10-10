import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {MaterialTabComponentOptions} from '../tab.options';

/**
 * Material tab model for properties editor
 */
export class MaterialTabModel implements MaterialTabComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    public children: LayoutComponentMetadata[]|undefined|null;

    //######################### constructor #########################
    constructor(value: MaterialTabComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}