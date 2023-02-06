import {Component, ChangeDetectionStrategy, ExistingProvider} from '@angular/core';
import {RelationNodeOutputSAComponent} from '@anglr/dynamic/relations-editor';

/**
 * Component used to display relation node output for debugging
 */
@Component(
{
    selector: 'relation-node-output-debug',
    template: '',
    standalone: true,
    providers:
    [
        <ExistingProvider>
        {
            provide: RelationNodeOutputSAComponent,
            useExisting: RelationNodeOutputDebugSAComponent,
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationNodeOutputDebugSAComponent extends RelationNodeOutputSAComponent
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