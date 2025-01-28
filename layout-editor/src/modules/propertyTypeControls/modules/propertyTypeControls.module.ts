import {NgModule} from '@angular/core';

import {InputBooleanComponent, InputNumberComponent, InputSizeComponent, InputStringComponent, SelectValueComponent, TextareaComponent} from '../components';
import {PropertyTypeControlRendererDirective} from '../directives';

/**
 * Module containing built-in property type controls
 */
@NgModule(
{
    imports:
    [
        TextareaComponent,
        InputStringComponent,
        InputBooleanComponent,
        InputNumberComponent,
        InputSizeComponent,
        SelectValueComponent,
        PropertyTypeControlRendererDirective,
    ],
    exports:
    [
        TextareaComponent,
        InputStringComponent,
        InputBooleanComponent,
        InputNumberComponent,
        InputSizeComponent,
        SelectValueComponent,
        PropertyTypeControlRendererDirective,
    ],
})
export class PropertyTypeControlsModule
{
}
