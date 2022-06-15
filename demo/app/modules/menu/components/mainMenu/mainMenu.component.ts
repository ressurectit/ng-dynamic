import {Component, ChangeDetectionStrategy} from '@angular/core';
import {TitledDialogService} from '@anglr/common/material';

import {UserSettingsSAComponent} from '../../../../components';

/**
 * Component used for displaying application main menu
 */
@Component(
{
    selector: 'main-menu',
    templateUrl: 'mainMenu.component.html',
    styleUrls: ['mainMenu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent
{
    //######################### constructor #########################
    constructor(private _dialog: TitledDialogService)
    {
    }

    //######################### public methods - template bindings #########################

    /**
     * Opens settings dialog
     */
    public openSettings()
    {
        this._dialog.open(UserSettingsSAComponent,
        {
            title: 'user settings',
            maxHeight: '80vh'
        });
    }
}