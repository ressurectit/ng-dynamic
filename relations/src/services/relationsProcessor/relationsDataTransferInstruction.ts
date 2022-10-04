import {SimpleChanges} from '@angular/core';

import {RelationsProcessorComponent} from '../../misc/types';
import {RelationsDataTransferInstruction} from './relationsProcessor.interface';

/**
 * Instruction containing data/changes that are needed for data transfer
 */
export class RelationsDataTransferInstructionImpl implements RelationsDataTransferInstruction
{
    //######################### private fields #########################

    /**
     * Changes that are coming into component
     */
    private _changes: SimpleChanges = {};

    //######################### public properties - implementation of RelationsDataTransferInstruction #########################

    /**
     * @inheritdoc
     */
    public get changes(): SimpleChanges
    {
        return this._changes;
    }

    //######################### constructor #########################
    constructor(protected components: RelationsProcessorComponent[],)
    {
    }

    //######################### public methods - implementation of RelationsDataTransferInstruction #########################

    /**
     * @inheritdoc
     */
    public applyChanges(): void
    {
        for(const component of this.components)
        {
            if(!component)
            {
                continue;
            }

            for(const key in this._changes)
            {
                const change = this._changes[key];

                (component as any)[key] = change.currentValue;
            }
            
            component.ngOnChanges?.(this._changes);
            component.invalidateVisuals();
        }
    }
}