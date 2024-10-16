import {ColumnDefinition, RowDefinition} from '../interfaces';

/**
 * Gets css rows template
 * @param rows - Array of rows definition
 */
export function toGridRowsTemplate(rows: RowDefinition[]|undefined|null): string
{
    return rows?.map(row => row.height).join(' ') || 'auto';
}

/**
 * Gets css columns template
 * @param columns - Array of columns definition
 */
export function toGridColumnsTemplate(columns: ColumnDefinition[]|undefined|null): string
{
    return columns?.map(column => column.width).join(' ') || 'auto';
}
