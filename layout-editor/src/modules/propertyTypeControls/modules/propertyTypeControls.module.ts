import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CastPipesModule} from '@anglr/common';
import {NumberInputModule} from '@anglr/common/forms';

import {InputBooleanComponent, InputNumberComponent, InputSizeComponent, InputStringComponent, SelectValueComponent, TextareaComponent} from '../components';
import {PropertyTypeControlRendererDirective} from '../directives';

/**
 * Module containing built-in property type controls
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        CastPipesModule,
        NumberInputModule,
    ],
    declarations:
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