import {Injectable} from '@angular/core';
import {PromiseOr} from '@jscrpt/common';

/**
 * Register that contains registered custom components
 */
@Injectable()
export class CustomComponentsRegister
{
    //######################### public methods #########################

    /**
     * Gets array of registered custom components names
     */
    public getRegisteredComponents(): PromiseOr<string[]>
    {
        return [];
    }
}