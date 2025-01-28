import {Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, Inject} from '@angular/core';
import {TitledDialogService} from '@anglr/common/material';
import {MetadataHistoryManager} from '@anglr/dynamic';
import {TooltipModule} from '@anglr/common';
import {lastValueFrom, Subject} from 'rxjs';

import {RelationsNode, RelationsNodeMetadata} from '../../interfaces';
import {RelationsNodePropertiesEditorSAComponent} from '../relationsNodePropertiesEditor/relationsNodePropertiesEditor.component';
import {RelationsNodeProperties, RelationsNodePropertiesEditorData} from '../relationsNodePropertiesEditor/relationsNodePropertiesEditor.interface';
import {ToColorPipe} from '../../pipes/toColor/toColor.pipe';
import {RELATIONS_HISTORY_MANAGER} from '../../misc/tokens';
import {ScopeRegister} from '../../services';

/**
 * Component used for displaying relations node header
 */
@Component(
{
    selector: 'relations-node-header',
    templateUrl: 'relationsNodeHeader.component.html',
    imports:
    [
        ToColorPipe,
        TooltipModule,
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
                protected changeDetector: ChangeDetectorRef,
                protected scopeRegister: ScopeRegister,
                @Inject(RELATIONS_HISTORY_MANAGER) protected history: MetadataHistoryManager<RelationsNodeMetadata[]>)
    {
    }

    //######################### protected methods - template bindings #########################

    /**
     * Opens editation of properties
     */
    protected async editProperties(): Promise<void>
    {
        const result = await lastValueFrom(this.dialog.open<RelationsNodePropertiesEditorSAComponent, RelationsNodePropertiesEditorData, RelationsNodeProperties|undefined|null>(RelationsNodePropertiesEditorSAComponent,
        {
            title: 'edit properties',
            width: '30vw',
            data: 
            {
                properties: 
                {
                    displayName: this.parent?.metadata?.displayName || this.name || this.parent?.metadata?.id || '',
                    scope: this.parent?.metadata?.scope ?? '',
                },
                scopeConfigurable: this.parent?.metadata?.nodeMetadata?.scopeConfigurable ?? false,
                scopeRegister: this.scopeRegister,
            }
        }).afterClosed());

        if(result && this.parent?.metadata)
        {
            this.parent.metadata.displayName = result.displayName ?? undefined;
            this.parent.metadata.scope = result.scope ?? undefined;
            this.history.getNewState();

            this.changeDetector.detectChanges();
        }
    }
}