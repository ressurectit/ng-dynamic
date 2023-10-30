import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizeSAPipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';
import {ConfigureNodeEndpointData, ConfigureNodeEndpointSAComponent} from '@anglr/dynamic/layout-relations';
import {TitledDialogService} from '@anglr/common/material';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {MergeRelationsOptions} from '../merge.options';

/**
 * Relations node component for merge
 */
@Component(
{
    selector: 'merge-node',
    templateUrl: 'mergeNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        CommonModule,
        FirstUppercaseLocalizeSAPipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MergeNodeSAComponent extends RelationsNodeBase<MergeRelationsOptions> implements RelationsNode<MergeRelationsOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Gets added properties names
     */
    protected get properties(): string[]
    {
        if(!this.metadata)
        {
            return [];
        }

        this.metadata.relationsOptions ??= 
        {
            properties: []
        };

        return this.metadata.relationsOptions.properties ?? [];
    }

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                protected dialog: TitledDialogService,)
    {
        super(changeDetector, element);
    }

    //######################### protected methods - template bindings #########################

    /**
     * Adds new property
     */
    protected async addProperty(): Promise<void>
    {
        await this.configureEndpoint(`prop${this.properties.length + 1}`);
    }

    /**
     * Removes property
     * @param name - Name of property to be removed
     */
    protected removeProperty(name: string): void
    {
        let index: number;

        if(this.metadata?.relationsOptions?.properties?.length && (index = this.metadata.relationsOptions.properties.indexOf(name)) >= 0)
        {
            this.metadata.relationsOptions.properties.splice(index, 1);

            this.history.getNewState();
        }
    }

    /**
     * Renames property
     * @param name - Allows renaming of property
     */
    protected async rename(name: string): Promise<void>
    {
        await this.configureEndpoint(name);

        this.changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Configures endpoint
     * @param name - Name to be configured
     */
    protected async configureEndpoint(name: string): Promise<boolean>
    {
        const editName: ConfigureNodeEndpointData =
        {
            name,
            defaultValue: undefined,
            noDefaultValue: true,
            skipInit: false,
        };

        const result = await lastValueFrom(this.dialog.open<ConfigureNodeEndpointSAComponent, ConfigureNodeEndpointData, true|undefined|null>(ConfigureNodeEndpointSAComponent,
        {
            title: 'configure property',
            width: '60vw',
            data: editName,
        }).afterClosed());

        //rename
        if(result && this.metadata?.relationsOptions)
        {
            let index;

            //rename
            if(this.metadata.relationsOptions.properties?.length && (index = this.metadata.relationsOptions.properties.indexOf(name)) >= 0)
            {
                this.metadata.relationsOptions.properties.splice(index, 1);
                this.metadata.relationsOptions.properties.splice(index, 0, editName.name);
            }
            //add
            else
            {
                this.metadata.relationsOptions.properties ??= [];
                this.metadata.relationsOptions.properties.push(editName.name);
            }

            this.history.getNewState();
        }

        return result ?? false;
    }
}