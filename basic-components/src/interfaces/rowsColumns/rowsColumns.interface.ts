/**
 * Definition of column
 */
export interface ColumnDefintion
{
    /**
     * Width of column
     */
    width: string;
}

/**
 * Definition of row
 */
export interface RowDefition
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
    rows: RowDefition[];

    /**
     * Definition of columns
     */
    columns: ColumnDefintion[];
}