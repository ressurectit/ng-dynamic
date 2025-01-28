import {Directive, inject, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {nameof} from '@jscrpt/common';

import {ListBlockRelations} from '../../../listBlock.relations';

/**
 * Directive that creates list block scoped relations component
 */
@Directive(
{
    selector: '[listBlockScope]',
})
export class ListBlockScopeRelationsSADirective<TDatum = any> implements OnChanges, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Indication whether is component initialized
     */
    protected initialized: boolean = false;

    /**
     * Instance of relations component manager
     */
    protected componentManager: RelationsComponentManager = inject(RelationsComponentManager);

    /**
     * Instance of relations processor
     */
    protected relationsProcessor: RelationsProcessor = inject(RelationsProcessor);

    /**
     * Instance of relations component
     */
    protected relations: ListBlockRelations = new ListBlockRelations();

    //######################### public properties - inputs #########################

    /**
     * Instance of datum assigned to this item in list
     */
    @Input()
    public datum: TDatum|null = null;

    /**
     * Index of assigned datum to this item in list
     */
    @Input()
    public index: number = 0;

    /**
     * Indication whether is this first item in list
     */
    @Input()
    public first: boolean = false;

    /**
     * Indication whether is this last item in list
     */
    @Input()
    public last: boolean = false;

    /**
     * Id of component that is being created
     */
    @Input()
    public componentId: string = '';

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        if(nameof<ListBlockScopeRelationsSADirective>('componentId') in changes && !this.initialized && this.componentId)
        {
            this.initialized = true;

            this.componentManager.registerComponent(this.componentId, this.relations);
            await this.relationsProcessor.initialized;
            this.relationsProcessor.updateRelations(this.componentId);
        }

        if(nameof<ListBlockScopeRelationsSADirective>('datum') in changes)
        {
            this.relations.datum = this.datum;
        }
        
        if(nameof<ListBlockScopeRelationsSADirective>('index') in changes)
        {
            this.relations.index = this.index;
        }

        if(nameof<ListBlockScopeRelationsSADirective>('first') in changes)
        {
            this.relations.first = this.first;
        }

        if(nameof<ListBlockScopeRelationsSADirective>('last') in changes)
        {
            this.relations.last = this.last;
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.relationsProcessor.destroyComponent(this.componentId);
        this.componentManager.unregisterComponent(this.componentId);
    }
}