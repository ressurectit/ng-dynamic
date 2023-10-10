import {FormGroup} from '@angular/forms';
import {FormArrayChild, FormArrayProperty} from '@anglr/common/forms';
import {mapValuesToThis} from '@jscrpt/common';

import {MaterialTabGroupComponentOptions, Tab} from '../tabGroup.options';

/**
 * Material tab model for properties editor
 */
export class MaterialTabGroupModel implements MaterialTabGroupComponentOptions
{
    //######################### public properties #########################

    @FormArrayChild(FormGroup)
    @FormArrayProperty()
    public tabs: Tab[]|undefined|null = [];

    //######################### constructor #########################
    constructor(value: MaterialTabGroupComponentOptions|undefined|null)
    {
        mapValuesToThis.bind(this)(value);
    }
}