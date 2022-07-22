import {SimpleChange, SimpleChanges} from '@angular/core';

/**
 * Adds simple change into simple changes object
 * @param changes - Object with changes to be added to
 * @param key - Key under wich should be change stored
 * @param currentValue - Current value that is being changed
 * @param previousValue - Previous value that is being changed
 * @param firstChange - Indication whether is first change, defaults to false
 */
export function addSimpleChange<TObj, TValue = any>(changes: SimpleChanges, key: Extract<keyof TObj, string>, currentValue: TValue|undefined|null, previousValue: TValue|undefined|null, firstChange: boolean = false): void
{
    changes[key] = <SimpleChange>
    {
        currentValue,
        previousValue,
        firstChange,
        isFirstChange: () => firstChange,
    };
}