import {Pipe, PipeTransform} from '@angular/core';

import {ColumnDefinition} from '../../../interfaces';
import {toGridColumnsTemplate} from '../../utils';

/**
 * Gets css columns template
 */
@Pipe({name: 'toGridColumnsTemplate'})
export class ToGridColumnsTemplatePipe implements PipeTransform
{
    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Gets css columns template
     * @param columns - Array of columns definition
     */
    public transform(columns: ColumnDefinition[]|undefined|null): string
    {
        return toGridColumnsTemplate(columns);
    }
}