import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {TitledDialogService} from '@anglr/common/material';
import {ConfigureNodeEndpointData, ConfigureNodeEndpointComponent} from '@anglr/dynamic/layout-relations';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';
import {extend} from '@jscrpt/common/extend';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {TriggerRelationsOptions} from '../trigger.options';

/**
 * Trigger node component for negation
 */
@Component(
{
    selector: 'trigger-node',
    templateUrl: 'triggerNode.component.html',
    imports:
    [
        CommonModule,
        RelationsNodeHeaderComponent,
        RelationNodeInputComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriggerNodeComponent extends RelationsNodeBase<TriggerRelationsOptions> implements RelationsNode<TriggerRelationsOptions>
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
            endpoints: []
        };

        return (this.metadata.relationsOptions.endpoints ??= []);
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
            skipInit: true,
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

        const result = await lastValueFrom(this.dialog.open<ConfigureNodeEndpointComponent, ConfigureNodeEndpointData, true|undefined|null>(ConfigureNodeEndpointComponent,
        {
            title: 'configure endpoint',
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
