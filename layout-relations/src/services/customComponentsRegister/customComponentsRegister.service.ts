import {Injectable} from '@angular/core';
import {PromiseOr} from '@jscrpt/common';

import {CustomComponentConfiguration} from './customComponentsRegister.interface';

/**
 * Register that contains registered custom components
 */
@Injectable()
export class CustomComponentsRegister<TConfig extends CustomComponentConfiguration = CustomComponentConfiguration>
{
    //######################### public methods #########################

    /**
     * Gets array of registered custom components names
     */
    public getRegisteredComponents(): PromiseOr<string[]>
    {
        return [];
    }

    /**
     * Gets configuration for custom component by its name
     * @param _name - Name of template of custom component for which configuration will be returned
     */
    public getConfigurationForComponent(_name: string): TConfig|undefined|null
    {
        return null;
    }

    /**
     * Sets configuration for custom component by its name
     * @param _name - Name of template of custom component for which configuration will be set
     * @param _config - Value of configuration to be set
     */
    public setConfigurationForComponent(_name: string, _config: TConfig): PromiseOr<void>
    {
    }
}