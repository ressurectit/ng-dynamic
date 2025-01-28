import {Component, ChangeDetectionStrategy, ExistingProvider} from '@angular/core';
import {RelationNodeOutputComponent} from '@anglr/dynamic/relations-editor';

/**
 * Component used to display relation node output for debugging
 */
@Component(
{
    selector: 'relation-node-output-debug',
    template: '',
    providers:
    [
        <ExistingProvider>
        {
            provide: RelationNodeOutputComponent,
            useExisting: RelationNodeOutputDebugComponent,
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationNodeOutputDebugComponent extends RelationNodeOutputComponent
{
    //######################### public properties #########################

    /**
     * Gets native html element for node
     */
    public get htmlElement(): HTMLElement
    {
        return this.element.nativeElement;
    }
}