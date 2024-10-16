/**
 * Definition of column
 */
export interface ColumnDefinition
{
    /**
     * Width of column
     */
    width: string;
}

/**
 * Definition of row
 */
export interface RowDefinition
{
    /**
     * Height of row
     */
    height: string;
}

/**
 * Options for rows/columns
 */
export interface RowsColumnsOptions
{
    //######################### properties #########################

    /**
     * Definition of rows
     */
    rows: RowDefinition[];

    /**
     * Definition of columns
     */
    columns: ColumnDefinition[];
}