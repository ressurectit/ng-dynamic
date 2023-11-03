import {FormGroup, FormArray} from '@angular/forms';
import {FormComponentBaseModel} from '@anglr/dynamic/form';
import {ModelPropertyMetadata} from '@anglr/common/forms';
import {mapValuesToThis} from '@jscrpt/common';

import {RadioComponentOptions} from '../radio.options';
import {RadioOption} from '../radio.interface';


export class RadioOptionModel implements RadioOption
{
    public code: string|null|undefined = '';
    
    public text: string|null|undefined = '';

    //######################### constructor #########################
    constructor(value?: RadioOption)
    {
        mapValuesToThis.bind(this)(value);
    }
}

/**
 * Radio model for properties editor
 */
export class RadioModel extends FormComponentBaseModel implements RadioComponentOptions
{
    //######################### public properties #########################

    /**
     * @inheritdoc
     */
    @ModelPropertyMetadata({childType: FormGroup, type: FormArray})
    public options: RadioOptionModel[]|undefined|null = null;
    
    //######################### constructor #########################
    constructor(value: RadioComponentOptions|undefined|null)
    {
        super(value);
        mapValuesToThis.bind(this)(value);

        if (this.options?.length)
        {
            this.options = this.options.map(itm => new RadioOptionModel(itm));
        }
    }
}