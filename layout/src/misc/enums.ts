/**
 * Defines behavior what should happen if rendered layout component type was not found
 */
export enum MissingTypeBehavior
{
    /**
     * Shows special not found component as *placeholder*
     */
    ShowNotFound,

    /**
     * Ignores missing component, silently continues
     */
    Ignore,

    /**
     * Throws javascript error with missing component error
     */
    ThrowError,
}