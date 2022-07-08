import {Injectable} from '@angular/core';

import {RelationNodeInputSAComponent} from '../../components/node/input/input.component';

/**
 * Class used for handling layout metadata
 */
@Injectable()
export class RelationManager
{
    //######################### private properties #########################

    /**
     * Active relation point input
     */
    private _activeInput: RelationNodeInputSAComponent|null|undefined;

    //######################### public methods #########################

    /**
     * Sets active relation input
     * @param input 
     */
    public setActiveInput(input: RelationNodeInputSAComponent|null|undefined): void
    {
        this._activeInput = input;
    }

    /**
     * Gets active relation input
     * @returns 
     */
    public getActiveInput(): RelationNodeInputSAComponent|null|undefined
    {
        return this._activeInput;
    }
}