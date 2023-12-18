import {PromiseOr} from '@jscrpt/common';

/**
 * Interface that describes dynamic on init phase
 */
export interface DynamicOnInit
{
    /**
     * Called on initialization of dynamic component
     */
    dynamicOnInit?(): PromiseOr<void>;
}
