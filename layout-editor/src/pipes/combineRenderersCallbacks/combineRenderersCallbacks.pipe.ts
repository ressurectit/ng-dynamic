import {Pipe, PipeTransform} from '@angular/core';
import {Action1} from '@jscrpt/common';

/**
 * Combines multipl renderers callbacks into one that calls them all
 */
@Pipe({name: 'combineRenderersCallbacks'})
export class CombineRenderersCallbacksSAPipe implements PipeTransform
{
    /**
     * Combines multipl renderers callbacks into one that calls them all
     * @param value - Array of callbacks that will be combined into one
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public transform(value: Action1<any>[]): Action1<unknown>
    {
        return item =>
        {
            for(const callback of value)
            {
                callback(item);
            }
        };
    }
}