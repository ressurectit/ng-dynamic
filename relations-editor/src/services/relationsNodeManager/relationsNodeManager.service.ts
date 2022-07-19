import {Injectable} from '@angular/core';

import {RelationNodeInputSAComponent} from '../../components';

/**
 * Class used for handling layout metadata
 */
@Injectable()
export class RelationsNodeManager
{
    //######################### private properties #########################

    /**
     * Active relation point input
     */
    private _activeInput: RelationNodeInputSAComponent|null|undefined;

    //######################### public methods #########################

    /**
     * Sets active relation input
     * @param input - Component that represents input
     */
    public setActiveInput(input: RelationNodeInputSAComponent|null|undefined): void
    {
        this._activeInput = input;
    }

    /**
     * Gets active relation input
     */
    public getActiveInput(): RelationNodeInputSAComponent|null|undefined
    {
        return this._activeInput;
    }
}