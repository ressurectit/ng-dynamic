import {Component} from '@angular/core';
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
})
export class TextareaComponent extends PropertyTypeControlBase<string> implements PropertyTypeControl<string>
{
}