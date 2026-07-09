import {Provider, SimpleChange, SimpleChanges, ValueProvider} from '@angular/core';
import {NEVER} from 'rxjs';

import {Destroyable, DynamicModule, PackageSource} from '../interfaces';
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

/**
 * Loader function returning a promise of a dynamically imported `DynamicModule`
 */
export type DynamicModuleLoader = () => Promise<DynamicModule>;

/**
 * Imports a dynamic item `type` module trying provided loaders in order until one succeeds
 *
 * This exists to bridge two different runtimes that the same source has to support:
 * - **deployed, compiled package** where dynamic items are emitted as `.js` files, so the
 *   glob dynamic import must reference `type.js`
 * - **local demo / debugging** where the packages are consumed as raw `.ts` sources through
 *   `tsconfig` path mappings, so esbuild only resolves the glob when it references `type.ts`
 *
 * Because bundlers (esbuild) build the lazy chunk map from the *literal* extension in the
 * `import()` template, the extension cannot be a runtime variable - each supported extension
 * has to appear as its own literal `import()` call. Only the extension matching the files that
 * are actually present resolves; the other one produces a harmless build-time `empty-glob`
 * warning and rejects at runtime, which is why every loader is attempted in order.
 *
 * Pass the production/deployed loader (`type.js`) first so that the shipped package resolves on
 * the first attempt without relying on a thrown/caught rejection.
 * @param loaders - Loaders attempted in order, first successful result is returned
 * @throws The rejection reason of the last loader when every loader fails
 */
export async function importDynamicItemType(...loaders: DynamicModuleLoader[]): Promise<DynamicModule>
{
    let lastError: unknown;

    for(const loader of loaders)
    {
        try
        {
            return await loader();
        }
        catch(e)
        {
            lastError = e;
        }
    }

    throw lastError;
}
