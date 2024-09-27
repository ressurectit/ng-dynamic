import {Component, ChangeDetectionStrategy} from '@angular/core';

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
}