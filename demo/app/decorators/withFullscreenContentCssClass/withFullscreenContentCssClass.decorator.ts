import {ɵɵclassProp, ɵComponentType, ɵComponentDef} from '@angular/core';
import {Writable} from '@jscrpt/common';

/**
 * Applies 'fullscreen-content' css class to components host
 */
export function WithFullscreenContentCssClass(): ClassDecorator
{
    return function<TFunction extends Function> (target: TFunction): TFunction
    {
        const original = ((target as unknown as ɵComponentType<unknown>).ɵcmp as ɵComponentDef<unknown>).hostBindings;

        ((target as unknown as ɵComponentType<unknown>).ɵcmp as Writable<ɵComponentDef<unknown>>).hostVars = (((target as unknown as ɵComponentType<unknown>).ɵcmp as ɵComponentDef<unknown>).hostVars ?? 0) + 2;
        ((target as unknown as ɵComponentType<unknown>).ɵcmp as Writable<ɵComponentDef<unknown>>).hostBindings = function NotFoundComponent_HostBindings(rf: number, _ctx: unknown)
        {
            original?.(rf, _ctx);

            if (rf & 2)
            {
                ɵɵclassProp('fullscreen-content', true);
            }
        };

        return target;
    };
}