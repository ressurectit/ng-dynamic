import {InjectionToken} from '@angular/core';

import {PackageSource} from '../interfaces';
import type {MetadataHistoryManagerState} from '../services/metadataHistoryManager/metadataHistoryManager.interface';

/**
 * Injection token used for injecting class that allows working with state of metadata
 */
export const METADATA_HISTORY_MANAGER_STATE: InjectionToken<MetadataHistoryManagerState> = new InjectionToken<MetadataHistoryManagerState>('METADATA_HISTORY_MANAGER_STATE');

/**
 * Injection token used for injecting package sources
 */
export const PACKAGE_SOURCES: InjectionToken<PackageSource[]> = new InjectionToken<PackageSource[]>('PACKAGE_SOURCES');
