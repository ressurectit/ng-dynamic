import {Component, ChangeDetectionStrategy} from '@angular/core';

/**
 * Component displaying components tree
 */
@Component(
{
    selector: 'components-tree',
    templateUrl: 'componentsTree.component.html',
    styleUrls: ['componentsTree.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentsTreeSAComponent
{
}