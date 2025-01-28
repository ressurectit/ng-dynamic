import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';

import {PropertyTypeControl} from '../../../../interfaces';
import {PropertyTypeControlBase} from '../propertyTypeControlBase';

/**
 * Component used for displaying textarea
 */
@Component(
{
    selector: 'textarea-input',
    templateUrl: 'textarea.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        ReactiveFormsModule,
        CastPipesModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends PropertyTypeControlBase<string> implements PropertyTypeControl<string>
{
}