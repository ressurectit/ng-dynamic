import {Injectable} from '@angular/core';
import {PromiseOr} from '@jscrpt/common';

import {CustomDynamicItemConfiguration} from './customDynamicItemsRegister.interface';

/**
 * Register that contains registered custom dynamic items
 */
@Injectable()
export class CustomDynamiItemsRegister<TConfig extends CustomDynamicItemConfiguration = CustomDynamicItemConfiguration>
{
    //######################### public methods #########################

    /**
     * Gets array of registered custom dynamic items names
     */
    public getRegisteredComponents(): PromiseOr<string[]>
    {
        return [];
    }

    /**
     * Gets configuration for custom dynamic item by its name
     * @param name - Name of template of custom dynamic item for which configuration will be returned
     */
    public getConfigurationForComponent(_name: string): PromiseOr<TConfig|undefined|null>
    {
        return null;
    }

    /**
     * Sets configuration for custom dynamic item by its name
     * @param name - Name of template of custom dynamic item for which configuration will be set
     * @param config - Value of configuration to be set
     */
    public setConfigurationForComponent(_name: string, _config: TConfig): PromiseOr<void>
    {
    }
}