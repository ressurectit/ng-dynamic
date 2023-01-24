import {Injector, SimpleChanges} from '@angular/core';
import {defineAssignedProp, defineSkipInitProp, PureRelationsComponent, RelationsChangeDetector, RelationsComponent, RelationsComponentManager} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata, VoidObject} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';
import {NEVER} from 'rxjs';

import {TriggerRelationsMetadataLoader} from './trigger.metadata';
import {TriggerRelationsOptions} from './trigger.options';

/**
 * Trigger relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(TriggerRelationsMetadataLoader)
export class TriggerRelations implements RelationsComponent<TriggerRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: TriggerRelationsOptions|undefined|null;

    /**
     * Current relations change detector
     */
    protected relationsChangeDetector: RelationsChangeDetector;

    /**
     * Current relations component manager
     */
    protected relationsComponentManager: RelationsComponentManager;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): TriggerRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: TriggerRelationsOptions|undefined|null)
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
        this.relationsChangeDetector = injector.get(RelationsChangeDetector);
        this.relationsComponentManager = injector.get(RelationsComponentManager);
    }

    //######################### public methods - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<TriggerRelations>('trigger') in changes)
        {
            if(this.relationsOptions?.endpoints?.length)
            {
                const id = this.relationsComponentManager.getId(this);

                if(id)
                {
                    for(const property of this.relationsOptions.endpoints)
                    {
                        this.relationsChangeDetector.markForCheck(
                        {
                            componentId: id,
                            outputName: property.name,
                        });
                    }
                }
            }
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
        if(this.relationsOptions?.endpoints?.length)
        {
            for(const property of this.relationsOptions.endpoints)
            {
                Object.defineProperty(this,
                                      property.name,
                                      {
                                          get: function()
                                          {
                                              return this[`ɵ${property.name}`];
                                          },
                                          set: function(value:any)
                                          {
                                              this[`ɵ${property.name}`] = value;
                                              defineAssignedProp(this, property.name);
                                          }
                                      });

                Object.defineProperty(this,
                                      `${property.name}Change`,
                                      {
                                          value: NEVER,
                                      });

                if(property.skipInit)
                {
                    defineSkipInitProp(this, property.name);
                }
            }
        }
    }
}