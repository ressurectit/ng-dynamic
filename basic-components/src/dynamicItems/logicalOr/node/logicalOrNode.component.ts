import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {RelationsNode, RelationsNodeBase, RelationNodeInputComponent, RelationNodeOutputComponent, RelationsNodeHeaderComponent} from '@anglr/dynamic/relations-editor';

/**
 * Relations node component for logical or
 */
@Component(
{
    selector: 'logical-or-node',
    templateUrl: 'logicalOrNode.component.html',
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
export class LogicalOrNodeComponent extends RelationsNodeBase implements RelationsNode
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
            this.metadata.relationsOptions.properties.push(`cond${this.properties.length + 3}`);

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