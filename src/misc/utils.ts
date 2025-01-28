import {Provider, SimpleChange, SimpleChanges, ValueProvider} from '@angular/core';
import {NEVER} from 'rxjs';

import {Destroyable, PackageSource} from '../interfaces';
import {PACKAGE_SOURCES} from './tokens';

/**
 * Adds simple change into simple changes object
 * @param changes - Object with changes to be added to
 * @param key - Key under wich should be change stored
 * @param currentValue - Current value that is being changed
 * @param previousValue - Previous value that is being changed
 * @param firstChange - Indication whether is first change, defaults to false
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

/**
 * Gets provider for static package source
 * @param packageName - Name of package for which will be provider created
 */
export function provideStaticPackageSource(packageName: string): Provider
{
    return <ValueProvider>
    {
        provide: PACKAGE_SOURCES,
        useValue: <PackageSource>
        {
            packages: [packageName],
            packagesChange: NEVER,
            refresh()
            {
            }
        },
        multi: true,
    };
}

/**
 * Gets json from its string representation
 * @param jsonString - Json string to be parsed into json
 */
export function getJson<TResult = any>(jsonString: string): TResult|null
{
    try
    {
        return JSON.parse(jsonString);
    }
    catch
    {
        return null;
    }
}

/**
 * Tests whether is object destroyable
 * @param value - Value to be tested
 */
export function isDestroyable(value: unknown): value is Destroyable
{
    return typeof (value as Destroyable)?.destroy === 'function';
}
