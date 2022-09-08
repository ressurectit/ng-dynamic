/**
 * Transforms data to another form of data
 * @param data - Data to be transformed
 */
export type TransformData<TData = any, TResult = any> = (data: TData) => TResult;