import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';

import {PropertyTypeControl} from '../../../../interfaces';
import {PropertyTypeControlBase} from '../propertyTypeControlBase';

/**
 * Component used for displaying input of type number
 */
@Component(
{
    selector: 'input-number',
    templateUrl: 'inputNumber.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        ReactiveFormsModule,
        CastPipesModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputNumberComponent extends PropertyTypeControlBase<number> implements PropertyTypeControl<number>
{
}