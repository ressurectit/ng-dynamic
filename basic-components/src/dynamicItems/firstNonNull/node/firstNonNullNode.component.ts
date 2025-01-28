import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputSAComponent, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent} from '@anglr/dynamic/relations-editor';

import {FirstNonNullRelationsOptions} from '../firstNonNull.options';

/**
 * Relations node component for first non null
 */
@Component(
{
    selector: 'first-non-null-node',
    templateUrl: 'firstNonNullNode.component.html',
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        CommonModule,
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstNonNullNodeSAComponent extends RelationsNodeBase<FirstNonNullRelationsOptions> implements RelationsNode<FirstNonNullRelationsOptions>
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

    /**
     * Adds new property
     */
    protected addProperty(): void
    {
        if (this.metadata?.relationsOptions)
        {
            this.metadata.relationsOptions.properties ??= [];
            this.metadata.relationsOptions.properties.push(`data${this.properties.length + 3}`);

            this.history.getNewState();
        }
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
}