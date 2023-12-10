import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentMetadata, LayoutComponentRendererSADirective, LAYOUT_METADATA_STORAGE} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsChangeDetector, RelationsComponentManager, RelationsManager, RelationsProcessor, RELATIONS_METADATA_STORAGE} from '@anglr/dynamic/relations';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {MetadataStorage} from '@anglr/dynamic';

import {TemplateBlockComponentOptions} from './templateBlock.options';
import {TemplateBlockLayoutDesignerTypeLoader, TemplateBlockLayoutMetadataLoader} from './templateBlock.metadata';

/**
 * Component used for displaying template block
 */
@Component(
{
    selector: 'template-block',
    templateUrl: 'templateBlock.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    providers:
    [
        RelationsComponentManager,
        RelationsManager,
        RelationsProcessor,
        RelationsChangeDetector,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(TemplateBlockLayoutDesignerTypeLoader)
@LayoutEditorMetadata(TemplateBlockLayoutMetadataLoader)
export class TemplateBlockSAComponent extends LayoutComponentBase<TemplateBlockComponentOptions> implements LayoutComponent<TemplateBlockComponentOptions>
{
    //######################### protected properties #########################

    /**
     * Storage for layout metadata
     */
    protected layoutMetadataStorage: MetadataStorage<LayoutComponentMetadata> = inject(LAYOUT_METADATA_STORAGE);

    /**
     * Storage for relations metadata
     */
    protected relationsMetadataStorage: MetadataStorage<RelationsNodeMetadata[]>|null = inject(RELATIONS_METADATA_STORAGE, {optional: true});

    /**
     * Instance of relations manager
     */
    protected relationsManager: RelationsManager|null = inject(RelationsManager, {optional: true});

    //######################### protected properties - template bindings #########################

    /**
     * Instance of metadata to be displayed
     */
    protected metadata: LayoutComponentMetadata|undefined|null = null;

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override async onOptionsSet(): Promise<void>
    {
        //TODO: check if required
        // if(!this.initialized)
        // {
        //     return;
        // }

        const id = this.options?.layoutId;

        if(!id)
        {
            return;
        }

        this.metadata = await this.layoutMetadataStorage.getMetadata(id);

        if(this.relationsManager && this.relationsMetadataStorage)
        {
            const relations = await this.relationsMetadataStorage.getMetadata(id);

            this.relationsManager.setRelations(relations ?? []);
        }
    }
}