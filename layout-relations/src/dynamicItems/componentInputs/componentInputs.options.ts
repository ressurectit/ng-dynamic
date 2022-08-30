/**
 * Definition of component input
 */
export interface ComponentInputDef<TValue = any>
{
    /**
     * Name of component input
     */
    name: string;

    /**
     * Default value for input, if not connected
     */
    defaultValue: TValue|undefined|null;
}

/**
 * Options for component inputs relations
 */
export interface ComponentInputsRelationsOptions
{
    /**
     * Array of component input definitions
     */
    inputs: ComponentInputDef[]|undefined|null;
}