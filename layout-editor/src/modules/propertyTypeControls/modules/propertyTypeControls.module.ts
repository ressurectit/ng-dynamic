import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipModule} from '@anglr/common';

import {InputStringComponent} from '../components';
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
        PropertyTypeControlRendererDirective,
    ],
    exports:
    [
        InputStringComponent,
        PropertyTypeControlRendererDirective,
    ],
})
export class PropertyTypeControlsModule
{
}