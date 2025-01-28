import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';

import {PropertyTypeControl} from '../../../../interfaces';
import {PropertyTypeControlBase} from '../propertyTypeControlBase';

/**
 * Component used for displaying input of type boolean
 */
@Component(
{
    selector: 'input-boolean',
    templateUrl: 'inputBoolean.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        ReactiveFormsModule,
        CastPipesModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputBooleanComponent extends PropertyTypeControlBase<boolean> implements PropertyTypeControl<boolean>
{
}