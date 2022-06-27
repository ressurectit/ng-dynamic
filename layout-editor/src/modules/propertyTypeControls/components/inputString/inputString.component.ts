import {Component, ChangeDetectionStrategy} from '@angular/core';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PropertyTypeControl} from '../../../../interfaces';
import {PropertyTypeControlBase} from '../propertyTypeControlBase';

/**
 * Component used for displaying input of type string
 */
@Component(
{
    selector: 'input-string',
    templateUrl: 'inputString.component.html',
    styles: [HostDisplayBlockStyle],
    // styleUrls: ['inputString.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputStringComponent extends PropertyTypeControlBase<string> implements PropertyTypeControl<string>
{
}