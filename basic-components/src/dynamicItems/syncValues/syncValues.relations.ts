import {Injector, SimpleChanges} from '@angular/core';
import {PureRelationsComponent, RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata, VoidObject} from '@anglr/dynamic/relations-editor';
import {isPresent, nameof} from '@jscrpt/common';
import {NEVER} from 'rxjs';

import {SyncValuesRelationsMetadataLoader} from './syncValues.metadata';
import {SyncValuesRelationsOptions} from './syncValues.options';

/**
 * Sync values relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(SyncValuesRelationsMetadataLoader)
export class SyncValuesRelations implements RelationsComponent<SyncValuesRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: SyncValuesRelationsOptions|undefined|null;

    /**
     * Current relations processor instance
     */
    protected relationsProcessor: RelationsProcessor;

    /**
     * Current relations component manager instance
     */
    protected relationsComponentManager: RelationsComponentManager;

    /**
     * Timeout reference
     */
    protected timeout: number|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): SyncValuesRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: SyncValuesRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;

        this.initialize();
    }

    //######################### public properties - inputs #########################

    /**
     * Trigger object
     */
    public trigger: VoidObject = {};

    //######################### constructor #########################
    constructor(injector: Injector,)
    {
        this.relationsProcessor = injector.get(RelationsProcessor);
        this.relationsComponentManager = injector.get(RelationsComponentManager);
    }

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(!this.relationsOptions)
        {
            return;
        }

        if(this.relationsOptions.triggerSync)
        {
            if(nameof<SyncValuesRelations>('trigger') in changes)
            {
                this.sendData();
            }
        }
        else
        {
            if(this.timeout)
            {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => this.sendData(), this.relationsOptions.idleTimeout ?? 0) as any;
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    //######################### protected methods #########################

    /**
     * Initialize rest relations
     */
    protected initialize(): void
    {
        if(this.relationsOptions)
        {
            if(this.relationsOptions.syncProperties && Array.isArray(this.relationsOptions.syncProperties))
            {
                for(const property of this.relationsOptions.syncProperties)
                {
                    Object.defineProperty(this,
                                          property,
                                          {
                                              configurable: true,
                                              enumerable: true,
                                              writable: true,
                                              value: null,
                                          });

                    Object.defineProperty(this,
                                          `${property}Change`,
                                          {
                                              configurable: true,
                                              enumerable: true,
                                              writable: true,
                                              value: NEVER,
                                          });
                }
            }
        }
    }

    /**
     * Sends output data
     */
    protected sendData(): void
    {
        const id = this.relationsComponentManager.getId(this);

        if(isPresent(id))
        {
            this.relationsProcessor.transferOutputsData(id, false);
        }
    }
}