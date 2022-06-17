/**
 * Creates type with all properties made async using Promise
 */
export type AsyncProperties<TModel, TKey extends keyof TModel = keyof TModel> = {[TProperty in TKey]: Promise<TModel[TProperty]>};
