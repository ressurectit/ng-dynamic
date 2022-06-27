import {Component, ChangeDetectionStrategy} from '@angular/core';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PropertyTypeControl} from '../../../../interfaces';
import {PropertyTypeControlBase} from '../propertyTypeControlBase';

/**
 * Component used for displaying input of type string
 */
@Component(
{
    selector: 'input-size',
    templateUrl: 'inputSize.component.html',
    styles: [HostDisplayBlockStyle],
    // styleUrls: ['inputSize.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSizeComponent extends PropertyTypeControlBase<string> implements PropertyTypeControl<string>
{
}