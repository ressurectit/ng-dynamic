import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';

import {PropertyTypeControl} from '../../../../interfaces';
import {PropertyTypeControlBase} from '../propertyTypeControlBase';

/**
 * Component used for displaying options and their selection
 */
@Component(
{
    selector: 'select-value',
    templateUrl: 'selectValue.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        CastPipesModule,
        ReactiveFormsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectValueComponent<TValue = any> extends PropertyTypeControlBase<TValue> implements PropertyTypeControl<TValue>
{
}