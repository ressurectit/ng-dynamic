import {Component, ChangeDetectionStrategy, Inject, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RelationsNodeDestroySubject} from '../../interfaces';
import {RELATIONS_NODE_DESTROY_SUBJECT} from '../../misc/tokens';

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
    //######################### constructor #########################
    constructor(@Inject(RELATIONS_NODE_DESTROY_SUBJECT) @Optional() protected destroySubject?: RelationsNodeDestroySubject,)
    {
    }
}