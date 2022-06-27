import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TooltipModule, CastPipesModule} from '@anglr/common';

import {InputBooleanComponent, InputSizeComponent, InputStringComponent} from '../components';
import {PropertyTypeControlRendererDirective} from '../directives';

/**
 * Module containing built-in property type controls
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        TooltipModule,
        ReactiveFormsModule,
        CastPipesModule,
    ],
    declarations:
    [
        InputStringComponent,
        InputBooleanComponent,
        InputSizeComponent,
        PropertyTypeControlRendererDirective,
    ],
    exports:
    [
        InputStringComponent,
        InputBooleanComponent,
        InputSizeComponent,
        PropertyTypeControlRendererDirective,
    ],
})
export class PropertyTypeControlsModule
{
}