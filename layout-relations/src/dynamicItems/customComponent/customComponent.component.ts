import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {MetadataStorage} from '@anglr/dynamic';
import {LayoutComponent, LayoutComponentBase, LayoutComponentMetadata, LayoutComponentRendererSADirective, LAYOUT_METADATA_STORAGE} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent, RELATIONS_METADATA_STORAGE} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';

import {CustomComponentComponentOptions} from './customComponent.options';
import {CustomComponentLayoutDesignerTypeLoader, CustomComponentLayoutMetadataLoader, CustomComponentRelationsMetadataLoader} from './customComponent.metadata';

/**
 * Component used for displaying custom component
 */
@Component(
{
    selector: 'custom-component',
    templateUrl: 'customComponent.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(CustomComponentLayoutDesignerTypeLoader)
@RelationsEditorMetadata(CustomComponentRelationsMetadataLoader)
@LayoutEditorMetadata(CustomComponentLayoutMetadataLoader)
export class CustomComponentSAComponent extends LayoutComponentBase<CustomComponentComponentOptions> implements LayoutComponent<CustomComponentComponentOptions>, RelationsComponent
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

    //######################### protected properties - template bindings #########################

    /**
     * Instance of metadata to be displayed
     */
    protected metadata: LayoutComponentMetadata|undefined|null = null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public methods #########################

    /**
     * Method that allows processing of custom component data
     * @param _name - Name of custom component
     */
    public processCustomComponentData(_name: string): PromiseOr<void>
    {
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override async afterInit(): Promise<void>
    {
        if(!this.options)
        {
            return;
        }

        this.metadata = await this.layoutMetadataStorage.getMetadata(this.options.name);
    }
}