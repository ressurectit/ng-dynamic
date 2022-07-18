import {DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutEditorMetadataDescriptor} from '@anglr/dynamic/layout-editor';

import {MaterialRadioComponentOptions} from './radio.options';

/**
 * Material radio layout metadata loader
 */
export const MaterialRadioLayoutMetadataLoader: DynamicMetadataLoader<LayoutEditorMetadataDescriptor<MaterialRadioComponentOptions>> = async () => new (await import('./metadata/radio.layoutMetadata')).MaterialRadioLayoutEditorMetadata();