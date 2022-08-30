import {Injectable} from '@angular/core';
import {PromiseOr} from '@jscrpt/common';

/**
 * Register that contains registered relations components
 */
@Injectable()
export class RelationsComponentsRegister
{
    //######################### public methods #########################

    /**
     * Gets array of relations components
     */
    public async getComponents(): Promise<string[]>
    {
        return [
            'componentInputs',
            'componentOutputs',
            ...(await this.getRegisteredComponents())
        ];
    }

    /**
     * Gets array of registered components names
     */
    protected getRegisteredComponents(): PromiseOr<string[]>
    {
        return [];
    }
}