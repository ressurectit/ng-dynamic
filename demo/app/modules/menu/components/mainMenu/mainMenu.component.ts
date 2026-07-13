import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

/**
 * Component used for displaying application main menu
 */
@Component(
{
    selector: 'main-menu',
    templateUrl: 'mainMenu.component.html',
    styleUrl: 'mainMenu.component.scss',
    imports:
    [
        RouterLink,
        RouterLinkActive,
    ],
})
export class MainMenuComponent
{
}