import {Component, ChangeDetectionStrategy} from '@angular/core';
import {HostDisplayBlockStyle} from '@anglr/common';

/**
 * Component used for displaying not found layout type placeholder
 */
@Component(
{
    selector: 'not-found-layout-type',
    templateUrl: 'notFoundLayoutType.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundLayoutTypeSAComponent 
{
}