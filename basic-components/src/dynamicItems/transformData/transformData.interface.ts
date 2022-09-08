/**
 * Represents class that supports data transformation
 */
export interface TransformData<TData = any, TResult = any>
{
    /**
     * Transforms data to another form of data
     * @param data - Data to be transformed
     */
    transformData(data: TData): TResult;
}