import {NgModule} from '@angular/core';
import {TitledDialogModule} from '@anglr/common/material';

import {MainMenuComponent} from '../components';

/**
 * Module for menu components
 */
@NgModule(
{
    imports:
    [
        TitledDialogModule,
    ],
    declarations:
    [
        MainMenuComponent
    ],
    exports:
    [
        MainMenuComponent
    ]
})
export class MenuModule
{
}