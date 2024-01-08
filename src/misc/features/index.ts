import {ClassProvider, FactoryProvider, Provider, Type} from '@angular/core';
import {isString} from '@jscrpt/common';

import {EditorHotkeys, PackageManager} from '../../services';
import {DynamicFeature} from './dynamic.feature';
import {FactoryFn} from '../factoryFn';

/**
 * Enables use of editor hotkeys (keyboard shortcuts)
 */
export function withEditorHotkeys(): DynamicFeature
{
    return new DynamicFeature(
    {
        layoutEditor:
        {
            prependProviders: [],
            providers:
            [
                EditorHotkeys,
            ],
        },
        relationsEditor:
        {
            prependProviders: [],
            providers:
            [
                EditorHotkeys,
            ],
        }
    });
}

/**
 * Enables use of custom package manager or set up package manager with persistent storage
 * @param storageOrPackageManager - Name of storage for default package manager, or custom package manager, or factory fn
 */
export function withPackageManager(storageOrPackageManager: string|Type<PackageManager>|FactoryFn<PackageManager>): DynamicFeature
{
    const provider: Provider = isString(storageOrPackageManager)
        ? <FactoryProvider>
        {
            provide: PackageManager,
            useFactory: () => new PackageManager(storageOrPackageManager),
        } 
        : storageOrPackageManager instanceof FactoryFn 
            ?
            <FactoryProvider>
            {
                provide: PackageManager,
                useFactory: storageOrPackageManager.factoryFn,
            }
            :
            <ClassProvider>
            {
                provide: PackageManager,
                useClass: storageOrPackageManager,
            };

    return new DynamicFeature(
    {
        layoutEditor:
        {
            prependProviders: [],
            providers:
            [
                provider,
            ],
        },
        relationsEditor:
        {
            prependProviders: [],
            providers:
            [
                provider,
            ],
        },
    });
}
