/**
 * Checks whether component support layout functionality
 * @param options Component options
 * @returns indication whether component support layout functionality
 */
export function isLayoutComponent(type: string)
{
    return [
        'layout', 
        'layout-relations',
    ].indexOf(type) >= 0;
}

/**
 * Checks whether component support relations functionality
 * @param options Component options
 * @returns indication whether component support relations functionality
 */
export function isRelationsComponent(type: string)
{
    return [
        'relations',
        'layout-relations',
    ].indexOf(type) >= 0;
}