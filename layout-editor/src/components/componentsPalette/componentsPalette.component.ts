import {Component, ChangeDetectionStrategy} from '@angular/core';

/**
 * Component displaying available components palette
 */
@Component(
{
    selector: 'components-palette',
    templateUrl: 'componentsPalette.component.html',
    styleUrls: ['componentsPalette.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsPaletteSAComponent
{
}