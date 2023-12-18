import {PromiseOr} from '@jscrpt/common';

/**
 * Interface that describes dynamic after view init phase
 */
export interface DynamicAfterViewInit
{
    /**
     * Called when view was initialized
     */
    dynamicAfterViewInit?(): PromiseOr<void>;
}
