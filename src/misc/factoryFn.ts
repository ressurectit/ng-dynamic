import {NoopAction} from '@jscrpt/common';

/**
 * Wrapper for factory functions, that allows to pass factory function to provider and also "type" (which is function in javascript)
 */
export class FactoryFn
{
    //######################### protected fields #########################

    /**
     * Value of factory function
     */
    protected factoryFnValue: NoopAction;

    //######################### public properties #########################

    /**
     * Gets factory function
     */
    public get factoryFn(): NoopAction
    {
        return this.factoryFnValue;
    }

    //######################### constructor #########################
    constructor(factoryFn: NoopAction)
    {
        this.factoryFnValue = factoryFn;
    }
}

/**
 * Creates factory function class
 * @param factoryFn - Factory function for provider
 */
export function factoryFn(factoryFn: NoopAction): FactoryFn
{
    return new FactoryFn(factoryFn);
}