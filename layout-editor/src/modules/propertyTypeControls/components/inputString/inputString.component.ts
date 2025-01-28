import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';

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
    imports:
    [
        ReactiveFormsModule,
        CastPipesModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputStringComponent extends PropertyTypeControlBase<string> implements PropertyTypeControl<string>
{
}