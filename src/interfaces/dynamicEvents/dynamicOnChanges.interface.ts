import {SimpleChanges} from '@angular/core';
import {PromiseOr} from '@jscrpt/common';

/**
 * Interface that describes dynamic on changes phase
 */
export interface DynamicOnChanges
{
    /**
     * Called before initialization and every time some property changes
     * @param changes - Information about changes that occured
     */
    dynamicOnChanges?(changes: SimpleChanges): PromiseOr<void>;
}
