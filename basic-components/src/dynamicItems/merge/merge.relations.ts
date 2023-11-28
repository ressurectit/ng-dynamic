import {Injector} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {Dictionary} from '@jscrpt/common';

import {MergeRelationsMetadataLoader} from './merge.metadata';
import {MergeRelationsOptions} from './merge.options';

/**
 * Merge relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(MergeRelationsMetadataLoader)
export class MergeRelations<TObj = unknown> implements RelationsComponent<MergeRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Options used in this relations component
     */
    protected ɵRelationsOptions: MergeRelationsOptions|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): MergeRelationsOptions|undefined|null
    {
        return this.ɵRelationsOptions;
    }
    public set relationsOptions(value: MergeRelationsOptions|undefined|null)
    {
        this.ɵRelationsOptions = value;

        this.initialize();
    }

    //######################### public properties - outputs #########################

    /**
     * Merged result object
     */
    @DynamicOutput()
    public mergedObject: TObj|undefined|null;

    //######################### constructor #########################
    constructor(protected injector: Injector,)
    {
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
        //TODO optimize property setter. Currently triggers multiple times when properties are set in sync.
        if(this.relationsOptions)
        {
            if(this.relationsOptions.properties?.length)
            {
                for(const name of this.relationsOptions.properties)
                {
                    if(name)
                    {
                        Object.defineProperty(this,
                                              name,
                                              {
                                                  set: value =>
                                                  {
                                                      this.mergedObject ??= {} as TObj;
                                                      (this.mergedObject as Dictionary)[name] = value;
                                                      this.mergedObject = {...this.mergedObject};
                                                  }
                                              });
                    }
                }
            }
        }
    }
}