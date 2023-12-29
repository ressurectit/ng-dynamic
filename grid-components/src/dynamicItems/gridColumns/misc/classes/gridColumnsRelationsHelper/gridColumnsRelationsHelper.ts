import {Injector, SimpleChanges} from '@angular/core';
import {RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {Destroyable, DynamicOnChanges} from '@anglr/dynamic';
import {nameof} from '@jscrpt/common';

import {GridColumnsRelations} from '../../../gridColumns.relations';
import {DataTableSAComponent} from '../../../../dataTable/dataTable.component';

/**
 * Helper class for creating grid columns relations
 */
export class GridColumnsRelationsHelper<TRow = unknown> implements DynamicOnChanges, Destroyable
{
    //######################### protected properties #########################

    /**
     * Instance of relations component manager
     */
    protected componentManager: RelationsComponentManager;

    /**
     * Instance of relations processor
     */
    protected relationsProcessor: RelationsProcessor;

    /**
     * Instance of relations component
     */
    protected relations: GridColumnsRelations = new GridColumnsRelations();

    /**
     * Id of relations component
     */
    protected componentId: string;

    //######################### public properties - inputs #########################

    /**
     * Instance of datum assigned to this item in list
     */
    public row: TRow|null = null;

    //######################### constructor #########################
    constructor(injector: Injector,)
    {
        this.componentManager = injector.get(RelationsComponentManager);
        this.relationsProcessor = injector.get(RelationsProcessor);

        const id = injector.get(DataTableSAComponent).options?.columns.id;

        if(!id)
        {
            throw new Error('GridColumnsRelationsHelper: missing component ID!');
        }

        this.componentId = id;

        this.register();
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * @inheritdoc
     */
    public async dynamicOnChanges(changes: SimpleChanges): Promise<void>
    {
        if(nameof<GridColumnsRelationsHelper>('row') in changes)
        {
            this.relations.row = this.row;
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * @inheritdoc
     */
    public destroy(): void
    {
        this.relationsProcessor.destroyComponent(this.componentId);
        this.componentManager.unregisterComponent(this.componentId);
    }

    //######################### protected methods #########################

    /**
     * Registers relations component
     */
    protected async register(): Promise<void>
    {
        this.componentManager.registerComponent(this.componentId, this.relations);
        await this.relationsProcessor.initialized;
        this.relationsProcessor.updateRelations(this.componentId);
    }
}