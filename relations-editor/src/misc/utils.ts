/**
 * Clamps number between two values
 * @param num number to clamp 
 * @param min minimum value
 * @param max maximum value
 * @returns 
 */
export function clamp(num: number, min: number, max: number): number
{
    return Math.min(Math.max(num, min), max);
}