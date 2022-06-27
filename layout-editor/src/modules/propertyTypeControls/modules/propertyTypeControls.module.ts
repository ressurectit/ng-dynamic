import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipModule} from '@anglr/common';

import {InputBooleanComponent, InputStringComponent} from '../components';
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
    ],
    declarations:
    [
        InputStringComponent,
        InputBooleanComponent,
        PropertyTypeControlRendererDirective,
    ],
    exports:
    [
        InputStringComponent,
        InputBooleanComponent,
        PropertyTypeControlRendererDirective,
    ],
})
export class PropertyTypeControlsModule
{
}