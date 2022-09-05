import {Injectable} from '@angular/core';
import {Dictionary} from '@jscrpt/common';

import {RelationsNodeAdditionalData} from './relationsNodeData.interface';

//TODO: remove if not used in the end

/**
 * Service handling additional data for relations node editor
 */
@Injectable()
export class RelationsNodeData
{
    //######################### protected properties #########################

    /**
     * Additional data for components
     */
    protected data: Dictionary<RelationsNodeAdditionalData> = {};

    //######################### public methods #########################

    /**
     * Adds new additional data for node by its id
     * @param id - Id of node that will have new additional data
     * @param data - Data that should be stored
     */
    public add(id: string, data: RelationsNodeAdditionalData): void
    {
        this.data[id] = data;
    }

    /**
     * Removes additional data for node by its id
     * @param id - Id of node that additional data should be removed
     */
    public remove(id: string): void
    {
        delete this.data[id];
    }

    /**
     * Gets additional data for node by its id
     * @param id - Id of node that additional data should be returned
     */
    public get(id: string): RelationsNodeAdditionalData|null
    {
        return this.data[id] ?? null;
    }
}