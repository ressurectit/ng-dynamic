import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {mapValuesToThis} from '@jscrpt/common';

import {FormComponentBaseModel} from '../../../metadata';
import {FormGroupComponentOptions} from '../formGroup.options';

/**
 * Form group model for properties editor
 */
export class FormGroupModel extends FormComponentBaseModel implements FormGroupComponentOptions
{
    /**
     * @inheritdoc
     */
    public children: LayoutComponentMetadata[]|undefined|null;

    //######################### constructor #########################
    constructor(value: FormGroupComponentOptions|undefined|null)
    {
        super(value);
        
        mapValuesToThis.bind(this)(value);
    }
}