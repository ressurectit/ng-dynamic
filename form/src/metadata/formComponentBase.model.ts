import {Type} from '@angular/core';
import {FormControl, FormGroup, FormArray} from '@angular/forms';
import {LayoutPropertyName, LayoutPropertyDescription, LayoutPropertyType, DefaultKnownPropertyTypes} from '@anglr/dynamic/layout-editor';
import {mapValuesToThis} from '@jscrpt/common';

import {FormComponentOptions} from '../misc/formComponentBase.options';

/**
 * Base form component model for properties editor
 */
export class FormComponentBaseModel implements FormComponentOptions
{
    /**
     * @inheritdoc
     */
    @LayoutPropertyName('Control name')
    @LayoutPropertyDescription('Form control name')
    @LayoutPropertyType<DefaultKnownPropertyTypes>('inputString')
    public controlName: string|null = null;

    /**
     * @inheritdoc
     */
    public controlType: Type<FormControl|FormGroup|FormArray>|undefined = undefined;

    //######################### constructor #########################
    constructor(value: FormComponentOptions|undefined|null)
    {
        //TODO: remove ! when fixed in common
        mapValuesToThis.bind(this)(value!);
    }
}