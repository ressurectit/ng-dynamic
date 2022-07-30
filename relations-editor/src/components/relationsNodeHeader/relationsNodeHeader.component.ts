import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Subject} from 'rxjs';

import {RelationsNode} from '../../interfaces';

/**
 * Component used for displaying relations node header
 */
@Component(
{
    selector: 'relations-node-header',
    templateUrl: 'relationsNodeHeader.component.html',
    // styleUrls: ['relationsNodeHeader.component.scss'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsNodeHeaderSAComponent
{
    //######################### public properties - inputs #########################

    /**
     * Parent relations node of node header
     */
    @Input()
    public parent: RelationsNode|undefined|null;

    /**
     * Subject used for destroying relations node
     */
    @Input()
    public destroySubject: Subject<void>|undefined|null;

    /**
     * Name of node to be displayed
     */
    @Input()
    public name: string|undefined|null;
}