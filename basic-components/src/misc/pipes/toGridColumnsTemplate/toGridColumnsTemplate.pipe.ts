import {Pipe, PipeTransform} from '@angular/core';

import {ColumnDefinition} from '../../../interfaces';

/**
 * Gets css columns template
 */
@Pipe({name: 'toGridColumnsTemplate', standalone: true})
export class ToGridColumnsTemplatePipe implements PipeTransform
{
    //######################### public methods - implementation of PipeTransform #########################
    
    /**
     * Gets css columns template
     * @param columns - Array of columns definition
     */
    public transform(columns: ColumnDefinition[]|undefined|null): string
    {
        return columns?.map(column => column.width).join(' ') || 'auto';
    }
}