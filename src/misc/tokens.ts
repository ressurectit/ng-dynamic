import {InjectionToken} from '@angular/core';

import {MetadataStateManager, PackageSource} from '../interfaces';

/**
 * Injection token used for injecting class that allows working with state of metadata
 */
export const METADATA_STATE_MANAGER: InjectionToken<MetadataStateManager> = new InjectionToken<MetadataStateManager>('METADATA_STATE_MANAGER');

/**
 * Injection token used for injecting package sources
 */
export const PACKAGE_SOURCES: InjectionToken<PackageSource[]> = new InjectionToken<PackageSource[]>('PACKAGE_SOURCES');
