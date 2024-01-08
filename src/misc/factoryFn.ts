import {Func0} from '@jscrpt/common';

/**
 * Wrapper for factory functions, that allows to pass factory function to provider and also "type" (which is function in javascript)
 */
export class FactoryFn<TType>
{
    //######################### protected fields #########################

    /**
     * Value of factory function
     */
    protected factoryFnValue: Func0<TType>;

    //######################### public properties #########################

    /**
     * Gets factory function
     */
    public get factoryFn(): Func0<TType>
    {
        return this.factoryFnValue;
    }

    //######################### constructor #########################
    constructor(factoryFn: Func0<TType>)
    {
        this.factoryFnValue = factoryFn;
    }
}

/**
 * Creates factory function class
 * @param factoryFn - Factory function for provider
 */
export function factoryFn<TType>(factoryFn: Func0<TType>): FactoryFn<TType>
{
    return new FactoryFn<TType>(factoryFn);
}