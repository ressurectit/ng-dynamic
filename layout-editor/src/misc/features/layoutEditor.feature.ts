import {Provider} from '@angular/core';
import {LayoutFeature} from '@anglr/dynamic';

import {DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR, DESIGNER_LAYOUT_COMPONENTS_EXTRACTOR, EDITOR_LAYOUT_RENDERER, LAYOUT_DESIGNER_COMPONENTS_PROVIDER, LAYOUT_EDITOR_METADATA_MANAGER, LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES_PROVIDER, LAYOUT_HISTORY_MANAGER_PROVIDER, LAYOUT_MODULE_TYPES_LOADER_PROVIDER} from '../providers';
import {DragActiveService, LayoutComponentsIteratorService, LayoutEditorMetadataExtractor, LayoutEditorMetadataManager, LayoutEditorPropertyMetadataExtractor, LayoutEditorRenderer, LiveEventService} from '../../services';

/**
 * This feature enables use of layout editor
 */
export class LayoutEditorFeature extends LayoutFeature
{
    //######################### public properties - implementation of LayoutEditorFeature #########################

    /**
     * @inheritdoc
     */
    public override get prependProviders(): Provider[]
    {
        return [
            DESIGNER_LAYOUT_COMPONENTS_EXTRACTOR,
        ];
    }

    /**
     * @inheritdoc
     */
    public override get providers(): Provider[]
    {
        return [
            LAYOUT_DESIGNER_COMPONENTS_PROVIDER,
            DEFAULT_LAYOUT_MODULE_TYPES_EXTRACTOR,
            LAYOUT_EDITOR_PROPERTY_METADATA_PROPERTIES_PROVIDER,
            LAYOUT_MODULE_TYPES_LOADER_PROVIDER,
            LayoutEditorMetadataExtractor,
            LayoutEditorPropertyMetadataExtractor,
            LayoutEditorMetadataManager,
            DragActiveService,
            //TODO: live events as feature
            LiveEventService,
            LayoutComponentsIteratorService,
            LayoutEditorRenderer,
            //TODO history as feature
            LAYOUT_HISTORY_MANAGER_PROVIDER,
            LAYOUT_EDITOR_METADATA_MANAGER,
            EDITOR_LAYOUT_RENDERER,
        ];
    }
}
