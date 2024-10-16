import {Pipe, PipeTransform} from '@angular/core';

import {RowDefinition} from '../../../interfaces';

/**
 * Gets css rows template
 */
@Pipe({name: 'toGridRowsTemplate', standalone: true})
export class ToGridRowsTemplatePipe implements PipeTransform
{
    //######################### public methods - implementation of PipeTransform #########################
    
    /**
     * Gets css rows template
     * @param rows - Array of rows definition
     */
    public transform(rows: RowDefinition[]|undefined|null): string
    {
        return rows?.map(row => row.height).join(' ') || 'auto';
    }
}