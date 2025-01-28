import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HostDisplayFlexStyle} from '@anglr/common';

import {PropertyTypeControl} from '../../../../interfaces';
import {PropertyTypeControlBase} from '../propertyTypeControlBase';

/**
 * Component used for displaying input of type size string
 */
@Component(
{
    selector: 'input-size',
    templateUrl: 'inputSize.component.html',
    styles: [HostDisplayFlexStyle],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSizeComponent extends PropertyTypeControlBase<string> implements PropertyTypeControl<string>
{
    //######################### protected properties - template bindings #########################

    /**
     * Control for numeric value of size
     */
    protected _value: FormControl<number|null> = new FormControl<number|null>(null);

    /**
     * Control for unit value of size
     */
    protected _unit: FormControl<string> = new FormControl<string>('px', {nonNullable: true});

    //######################### protected - overrides #########################

    /**
     * @inheritdoc
     */
    protected override _controlSet(): void
    {
        const value = this._control?.value;

        if(value)
        {
            const matches = /^(\d*\.?\d+)\s*([^0-9.]+$)/.exec(value);

            if(matches)
            {
                this._value.setValue(+matches[1]);
                this._unit.setValue(matches[2]);

                return;
            }
        }

        this._unit.setValue('px');
        this._value.setValue(null);
    }

    /**
     * @inheritdoc
     */
    protected override _initialize(): void
    {
        this._value.valueChanges.subscribe(value =>
        {
            const unit = this._unit.value;

            //use empty value for size
            if(!value || !unit)
            {
                this._control?.setValue(null);

                return;
            }

            this.control?.setValue(`${value}${unit}`);
        });

        this._unit.valueChanges.subscribe(unit =>
        {
            const value = this._value.value;

            //use empty value for size
            if(!value || !unit)
            {
                this._control?.setValue(null);

                return;
            }

            this.control?.setValue(`${value}${unit}`);
        });
    }
}