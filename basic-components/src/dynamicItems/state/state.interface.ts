/**
 * Function that is used for handling input value
 * @param data - Data that are passed to this function for processing
 */
export type InputFunction<TData = unknown, TState = unknown> = (this: StatefullClass<TState>, data: TData) => void;

/**
 * Definition of statefull class
 */
export interface StatefullClass<TState = unknown>
{
    /**
     * Current state that is stored for this class
     */
    state: TState|undefined|null;
}