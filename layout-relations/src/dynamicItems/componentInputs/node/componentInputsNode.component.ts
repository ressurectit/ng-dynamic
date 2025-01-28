import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';
import {TitledDialogService} from '@anglr/common/material';
import {extend} from '@jscrpt/common/extend';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {ComponentInputsRelationsOptions} from '../componentInputs.options';
import {ConfigureNodeEndpointData, ConfigureNodeEndpointComponent} from '../../../components';

/**
 * Relations node component for component inputs
 */
@Component(
{
    selector: 'component-inputs-node',
    templateUrl: 'componentInputsNode.component.html',
    imports:
    [
        CommonModule,
        RelationsNodeHeaderComponent,
        RelationNodeOutputComponent,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentInputsNodeComponent extends RelationsNodeBase<ComponentInputsRelationsOptions> implements RelationsNode<ComponentInputsRelationsOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Gets component inputs
     */
    protected get endpoints(): ConfigureNodeEndpointData[]
    {
        if(!this.metadata)
        {
            return [];
        }

        this.metadata.relationsOptions ??=
        {
            inputs: []
        };

        return (this.metadata.relationsOptions.inputs ??= []);
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
     * Adds new input endpoint
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

        const result = await lastValueFrom(this.dialog.open<ConfigureNodeEndpointComponent, ConfigureNodeEndpointData, true|undefined|null>(ConfigureNodeEndpointComponent,
        {
            title: 'configure component input',
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