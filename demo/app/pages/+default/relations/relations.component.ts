import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';

/**
 * Page for displaying relations
 */
@Component(
{
    selector: 'relations-view',
    templateUrl: 'relations.component.html',
    // styleUrls: ['relations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'relations'})
export class RelationsComponent
{
}