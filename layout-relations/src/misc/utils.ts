import {Injector} from '@angular/core';
import {LayoutComponentMetadata, LAYOUT_METADATA_STORAGE} from '@anglr/dynamic/layout';
import {LayoutComponentsIteratorService, LayoutEditorMetadataExtractor} from '@anglr/dynamic/layout-editor';
import {MetadataStorage} from '@anglr/dynamic';
import {LOGGER} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';

import {ContentComponentData} from '../components';

/**
 * Gets custom component metadata info
 * @param name - Name of component which metadata are obtained
 * @param injector - Instance of injector used for obtaining required services
 */
export async function getCustomComponentMeta(name: string, injector: Injector): Promise<{contentMetadata: Dictionary<ContentComponentData>, metadata: LayoutComponentMetadata|undefined|null}|null>
{
    const layoutMetadataStorage: MetadataStorage<LayoutComponentMetadata> = injector.get(LAYOUT_METADATA_STORAGE);
    const customComponentMetadata = await layoutMetadataStorage.getMetadata(name);
    const logger = injector.get(LOGGER);

    if(!customComponentMetadata)
    {
        logger.warn('ContentOptionsPropertiesControlSAComponent: missing layout metadata for custom component!');

        return null;
    }

    const layoutMetadataIterator = injector.get(LayoutComponentsIteratorService);
    const iterator = layoutMetadataIterator.getIteratorFor(customComponentMetadata);
    const metadataExtractor = injector.get(LayoutEditorMetadataExtractor);
    const customComponentContentMetadata: Dictionary<ContentComponentData> = {};

    for await(const component of iterator)
    {
        const metadata = await metadataExtractor.extractMetadata(component.metadata);

        if(!metadata)
        {
            logger.warn('ContentOptionsPropertiesControlSAComponent: missing metadata for component!');

            continue;
        }

        customComponentContentMetadata[component.metadata.id] =
        {
            metadata: component.metadata,
            editorMetadata: metadata,
        };
    }

    return {
        contentMetadata: customComponentContentMetadata,
        metadata: customComponentMetadata,
    };
}