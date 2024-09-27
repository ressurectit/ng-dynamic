import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CommonUtilsModule, CommonLocalizeModule, TooltipModule} from '@anglr/common';
import {NumeralPipe} from '@anglr/common';
import {DatePipesModule} from '@anglr/datetime';
import {TranslateModule} from '@ngx-translate/core';

/**
 * Common module for displaying readonly data helpers
 */
@NgModule(
{
    imports:
    [
        NumeralPipe,
    ],
    exports:
    [
        CommonModule,
        RouterModule,
        CommonUtilsModule,
        CommonLocalizeModule,
        NumeralPipe,
        TooltipModule,
        TranslateModule,
        DatePipesModule,
    ]
})
export class DisplayingFeatureModule
{
}