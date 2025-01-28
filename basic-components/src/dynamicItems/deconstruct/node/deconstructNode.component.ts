import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {TitledDialogService} from '@anglr/common/material';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputComponent, RelationsNodeHeaderComponent, RelationNodeInputComponent} from '@anglr/dynamic/relations-editor';
import {ComponentEndpointDef, ConfigureNodeEndpointData, ConfigureNodeEndpointComponent} from '@anglr/dynamic/layout-relations';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {DeconstructRelationsOptions} from '../deconstruct.options';

/**
 * Relations node component for deconstruct
 */
@Component(
{
    selector: 'deconstruct-node',
    templateUrl: 'deconstructNode.component.html',
    imports:
    [
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        CommonModule,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeconstructNodeComponent extends RelationsNodeBase<DeconstructRelationsOptions> implements RelationsNode<DeconstructRelationsOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Gets added property names
     */
    protected get properties(): ComponentEndpointDef[]
    {
        if(!this.metadata)
        {
            return [];
        }

        this.metadata.relationsOptions ??= 
        {
            properties: [],
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
        const name: ConfigureNodeEndpointData =
        {
            name: `property${this.properties.length + 1}`,
            defaultValue: undefined,
            noDefaultValue: true,
            skipInit: false,
            allowSkipInit: true,
        };

        await this.configureEndpoint(name);
    }

    /**
     * Removes property
     * @param name - Name of property to be removed
     */
    protected removeProperty(name: string): void
    {
        let index: number;

        if(this.metadata?.relationsOptions?.properties && (index = this.metadata.relationsOptions.properties.findIndex(itm => itm.name == name)) >= 0)
        {
            this.metadata.relationsOptions.properties.splice(index, 1);

            this.history.getNewState();
        }
    }

    /**
     * Configures endpoint
     * @param endpoint - Endpoint to be configured
     */
    protected async configureEndpoint(endpoint: ConfigureNodeEndpointData): Promise<boolean>
    {
        const newEndpoint = JSON.parse(JSON.stringify(endpoint));
        
        const result = await lastValueFrom(this.dialog.open<ConfigureNodeEndpointComponent, ConfigureNodeEndpointData, true|undefined|null>(ConfigureNodeEndpointComponent,
        {
            title: 'configure property',
            width: '60vw',
            data: newEndpoint,
        }).afterClosed());

        //rename
        if(result && this.metadata?.relationsOptions)
        {
            let index: number;

            if(this.metadata.relationsOptions.properties && (index = this.metadata.relationsOptions.properties.findIndex(itm => itm.name == endpoint.name)) >= 0)
            {
                this.metadata.relationsOptions.properties.splice(index, 1);
                this.metadata.relationsOptions.properties.splice(index, 0, newEndpoint);
            }
            else
            {
                this.metadata.relationsOptions.properties ??= [];
                this.metadata.relationsOptions.properties.push(newEndpoint);
            }

            this.history.getNewState();
        }

        return result ?? false;
    }
}