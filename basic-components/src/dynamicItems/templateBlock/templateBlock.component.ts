import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentMetadata, LayoutComponentRendererSADirective, LAYOUT_METADATA_STORAGE} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
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
    protected metadataStorage: MetadataStorage<LayoutComponentMetadata> = inject(LAYOUT_METADATA_STORAGE);

    //######################### protected properties - template bindings #########################

    /**
     * Instance of metadata to be displayed
     */
    protected metadata: LayoutComponentMetadata|undefined|null = null;

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override async _onOptionsSet(): Promise<void>
    {
        if(!this._initialized)
        {
            return;
        }

        const id = this.options?.layoutId;

        if(!id)
        {
            return;
        }

        this.metadata = await this.metadataStorage.getMetadata(id);
    }
}