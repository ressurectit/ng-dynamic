import {Pipe, PipeTransform} from '@angular/core';

/**
 * Transforms data into formatted json
 */
@Pipe({name: 'jsonFormatted'})
export class JsonFormattedSAPipe<TValue = unknown> implements PipeTransform
{
    /**
     * Transforms data into formatted json
     * @param value - Data to be formatted
     */
    public transform(value: TValue): string
    {
        return JSON.stringify(value, undefined, 2);
    }
}