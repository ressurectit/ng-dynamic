import {Pipe, PipeTransform} from '@angular/core';

/**
 * Filters out used packages
 */
@Pipe({name: 'withoutUsed'})
export class WithoutUsedPipe implements PipeTransform
{
    /**
     * Filters out used packages
     * @param value - Array of available packages
     * @param used - Array of used packages
     */
    public transform(value: readonly string[], used: string[]): readonly string[]
    {
        return value.filter(itm => !used.find(it => it == itm));
    }
}