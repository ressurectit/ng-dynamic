import {Component, ChangeDetectionStrategy} from '@angular/core';
import {HostDisplayBlockStyle} from '@anglr/common';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputBooleanComponent extends PropertyTypeControlBase<boolean> implements PropertyTypeControl<boolean>
{
}