/**
 * Defines behavior what should happen if rendered node type was not found
 */
export enum MissingNodeBehavior
{
    /**
     * Shows special not found node as *placeholder*
     */
    ShowNotFound,

    /**
     * Ignores missing node, silently continues
     */
    Ignore,

    /**
     * Throws javascript error with missing node error
     */
    ThrowError
}