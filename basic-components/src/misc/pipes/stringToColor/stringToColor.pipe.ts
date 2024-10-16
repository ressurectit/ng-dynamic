import {Pipe, PipeTransform} from '@angular/core';
import {isBlank, stringToColour} from '@jscrpt/common';

//TODO: move into common

/**
 * Transforms string into hex color string
 */
@Pipe({name: 'stringToColor', standalone: true})
export class StringToColorPipe implements PipeTransform
{
    /**
     * Transforms string into hex color string
     * @param value - String to be converted
     */
    public transform(value: string|undefined|null): string|undefined|null
    {
        if(isBlank(value))
        {
            return value;
        }

        return stringToColour(value);
    }
}