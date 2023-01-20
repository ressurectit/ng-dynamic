import {Injector, Input, SimpleChanges} from '@angular/core';
import {defineAssignedProp, defineSkipInitProp, PureRelationsComponent, RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {Dictionary, isPresent, nameof} from '@jscrpt/common';
import {Subject} from 'rxjs';

import {DeconstructRelationsMetadataLoader} from './deconstruct.metadata';
import {DeconstructRelationsOptions} from './deconstruct.options';

/**
 * Deconstruct relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(DeconstructRelationsMetadataLoader)
export class DeconstructRelations<TObj extends Dictionary = Dictionary> implements RelationsComponent<DeconstructRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: DeconstructRelationsOptions|undefined|null;

    /**
     * Current relations processor instance
     */
    protected relationsProcessor: RelationsProcessor;

    /**
     * Current relations component manager instance
     */
    protected relationsComponentManager: RelationsComponentManager;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): DeconstructRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: DeconstructRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;

        this.initialize();
    }

    //######################### public properties - inputs #########################

    /**
     * Initial state value that is set
     */
    @Input()
    public object: TObj|undefined|null;

    //######################### constructor #########################
    constructor(injector: Injector,)
    {
        this.relationsProcessor = injector.get(RelationsProcessor);
        this.relationsComponentManager = injector.get(RelationsComponentManager);
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<DeconstructRelations>('object') in changes)
        {
            if(this.relationsOptions?.properties.length)
            {
                for(const property of this.relationsOptions.properties)
                {
                    const thisDictionary = this as Dictionary;

                    thisDictionary[property.name] = this.object?.[property.name];
                }
            }

            const id = this.relationsComponentManager.getId(this);

            if(isPresent(id))
            {
                this.relationsProcessor.transferOutputsData(id, false);
            }
        }
    }

    //######################### public properties - dynamic outputs #########################

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
            if(this.relationsOptions.properties.length)
            {
                for(const property of this.relationsOptions.properties)
                {
                    if(property.name)
                    {
                        Object.defineProperty(this,
                                              property.name,
                                              {
                                                  get: function()
                                                  {
                                                      return this[`ɵ${property.name}`];
                                                  },
                                                  set: function(value)
                                                  {
                                                      this[`ɵ${property.name}`] = value;
                                                      defineAssignedProp(this, property.name);
                                                  }
                                              });

                        Object.defineProperty(this,
                                              `${property.name}Change`,
                                              {
                                                  get: function()
                                                  {
                                                      if(!this[`ɵ${property.name}Change`])
                                                      {
                                                          this[`ɵ${property.name}Change`] = new Subject<void>();
                                                      }

                                                      return this[`ɵ${property.name}Change`];
                                                  }
                                              });

                        if(property.skipInit)
                        {
                            defineSkipInitProp(this, property.name);
                        }
                    }
                }
            }
        }
    }
}