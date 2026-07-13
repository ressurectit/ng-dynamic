import {Component} from '@angular/core';
import {HostDisplayBlockStyle, LocalizePipe} from '@anglr/common';

/**
 * Component used for displaying not found layout type placeholder
 */
@Component(
{
    selector: 'not-found-layout-type',
    templateUrl: 'notFoundLayoutType.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        LocalizePipe,
    ],
})
export class NotFoundLayoutTypeComponent
{
}