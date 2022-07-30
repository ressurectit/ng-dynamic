import {Component, ChangeDetectionStrategy, Input, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TitledDialogService} from '@anglr/common/material';
import {Subject} from 'rxjs';

import {RelationsNode} from '../../interfaces';
import {RelationsNodeHeaderDisplayNameEditorSAComponent} from '../relationsNodeHeaderDisplayNameEditor/relationsNodeHeaderDisplayNameEditor.component';

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

    //######################### constructor #########################
    constructor(protected dialog: TitledDialogService,
                protected changeDetector: ChangeDetectorRef,)
    {
    }

    //######################### protected methods - template bindings #########################

    /**
     * Opens editation of display name
     */
    protected async editDisplayName(): Promise<void>
    {
        const result = await this.dialog.open<RelationsNodeHeaderDisplayNameEditorSAComponent, string, string|undefined|null>(RelationsNodeHeaderDisplayNameEditorSAComponent,
        {
            title: 'edit display name',
            width: '30vw',
            data: this.parent?.metadata?.displayName || this.name || this.parent?.metadata?.id || ''
        }).afterClosed()
            .toPromise();

        if(result && this.parent?.metadata)
        {
            this.parent.metadata.displayName = result;

            this.changeDetector.detectChanges();
        }
    }
}