import {Pipe, PipeTransform} from '@angular/core';
import {stringToColour} from '@jscrpt/common';

/**
 * Converts string to color code
 */
@Pipe({name: 'toColor'})
export class ToColorPipe implements PipeTransform
{
    /**
     * Converts string to color code
     * @param value - String to be converted
     */
    public transform(value: string|undefined|null): string|null
    {
        if(!value)
        {
            return null;
        }

        return stringToColour(value);
    }
}