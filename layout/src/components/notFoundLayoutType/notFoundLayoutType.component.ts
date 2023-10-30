import {Component, ChangeDetectionStrategy} from '@angular/core';
import {HostDisplayBlockStyle, LocalizeSAPipe} from '@anglr/common';

/**
 * Component used for displaying not found layout type placeholder
 */
@Component(
{
    selector: 'not-found-layout-type',
    templateUrl: 'notFoundLayoutType.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundLayoutTypeSAComponent 
{
}