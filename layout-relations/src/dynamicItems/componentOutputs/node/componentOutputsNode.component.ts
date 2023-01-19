import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RelationsNode, RelationsNodeBase, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';
import {TitledDialogService} from '@anglr/common/material';
import {extend} from '@jscrpt/common';
import {lastValueFrom} from 'rxjs';

import {ComponentOutputsRelationsOptions} from '../componentOutputs.options';
import {ConfigureNodeEndpointData, ConfigureNodeEndpointSAComponent} from '../../../components';

/**
 * Relations node component for component outputs
 */
@Component(
{
    selector: 'component-outputs-node',
    templateUrl: 'componentOutputsNode.component.html',
    standalone: true,
    imports:
    [
        CommonModule,
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentOutputsNodeSAComponent extends RelationsNodeBase<ComponentOutputsRelationsOptions> implements RelationsNode<ComponentOutputsRelationsOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Gets component outputs
     */
    protected get endpoints(): ConfigureNodeEndpointData[]
    {
        if(!this.metadata)
        {
            return [];
        }

        this.metadata.relationsOptions ??= 
        {
            outputs: []
        };

        return (this.metadata.relationsOptions.outputs ??= []);
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
     * Adds new output endpoint
     */
    protected async addEndpoint(): Promise<void>
    {
        const param: ConfigureNodeEndpointData = 
        {
            name: '',
            defaultValue: null,
            skipInit: false,
            allowSkipInit: true,
        };

        if(await this.configureEndpoint(param))
        {
            this.endpoints.push(param);
            this.history.getNewState();
        }
    }

    /**
     * Removes endpoint
     * @param endpoint - Endpoint to be removed
     */
    protected removeEndpoint(endpoint: ConfigureNodeEndpointData): void
    {
        const index = this.endpoints.indexOf(endpoint);

        if(index >= 0)
        {
            this.endpoints.splice(index, 1);
            this.history.getNewState();
        }
    }

    /**
     * Configures endpoint
     * @param endpoint - Endpoint to be configured
     */
    protected async configureEndpoint(endpoint: ConfigureNodeEndpointData): Promise<boolean>
    {
        const original = JSON.parse(JSON.stringify(endpoint));
        
        const result = await lastValueFrom(this.dialog.open<ConfigureNodeEndpointSAComponent, ConfigureNodeEndpointData, true|undefined|null>(ConfigureNodeEndpointSAComponent,
        {
            title: 'configure component output',
            width: '60vw',
            data: endpoint
        }).afterClosed());

        if(!result)
        {
            extend(endpoint, original);
        }
        else
        {
            this.history.getNewState();
        }

        return result ?? false;
    }
}