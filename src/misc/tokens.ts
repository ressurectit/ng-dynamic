import {InjectionToken} from '@angular/core';

import {EditorMetadataManager, PackageSource} from '../interfaces';

/**
 * Injection token used for injecting class that allows working with state of metadata
 */
export const EDITOR_METADATA_MANAGER: InjectionToken<EditorMetadataManager> = new InjectionToken<EditorMetadataManager>('METADATA_STATE_MANAGER');

/**
 * Injection token used for injecting package sources
 */
export const PACKAGE_SOURCES: InjectionToken<PackageSource[]> = new InjectionToken<PackageSource[]>('PACKAGE_SOURCES');

/**
 * Injection token used for injecting current scope id
 */
export const SCOPE_ID: InjectionToken<string> = new InjectionToken<string>('SCOPE_ID');

/**
 * Injection token used for injecting monaco editor resources 'path', defaults to 'monaco-editor/vs'
 */
export const MONACO_EDITOR_RESOURCES_PATH: InjectionToken<string> = new InjectionToken<string>('MONACO_EDITOR_RESOURCES_PATH', {providedIn: 'root', factory: () => 'monaco-editor/vs'});
