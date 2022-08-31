import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {MetadataStorage} from '@anglr/dynamic';
import {LayoutComponent, LayoutComponentBase, LayoutComponentMetadata, LayoutComponentRendererSADirective, LAYOUT_METADATA_STORAGE} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent, RelationsComponentManager, RelationsManager, RelationsProcessor, RELATIONS_METADATA_STORAGE} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {PromiseOr} from '@jscrpt/common';

import {CustomComponentComponentOptions} from './customComponent.options';
import {CustomComponentLayoutDesignerTypeLoader, CustomComponentLayoutMetadataLoader, CustomComponentRelationsMetadataLoader} from './customComponent.metadata';
import {ComponentOutputsRelationsSAComponent} from '../componentOutputs/componentOutputs.relations.component';
import {ComponentInputsRelationsSAComponent} from '../componentInputs/componentInputs.relations.component';

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
        ComponentInputsRelationsSAComponent,
        ComponentOutputsRelationsSAComponent,
    ],
    providers:
    [
        RelationsComponentManager,
        RelationsManager,
        RelationsProcessor,
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
     * Id of custom component
     */
    protected id: string = '';

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

    /**
     * Parent relations processor instance
     */
    protected parentRelationsProcessor: RelationsProcessor|null = inject(RelationsProcessor, {skipSelf: true, optional: true});

    /**
     * Parent relations component manager
     */
    protected parentComponentManager: RelationsComponentManager|null = inject(RelationsComponentManager, {skipSelf: true, optional: true});

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

    /**
     * Sets id of custom component
     * @param id - Id of custom component
     */
    public setId(id: string): void
    {
        this.id = id;
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

        if(this.relationsManager && this.relationsMetadataStorage)
        {
            const relations = await this.relationsMetadataStorage.getMetadata(this.options.name);

            this.relationsManager.setRelations(relations ?? []);
        }

        if(this.parentComponentManager && this.parentRelationsProcessor)
        {
            this.parentComponentManager.registerComponent(this.id, this);
            await this.parentRelationsProcessor.initialized;
            this.parentRelationsProcessor.updateRelations(this.id);
        }
    }

    /**
     * @inheritdoc
     */
    protected override onDestroy(): void
    {
        if(!this.parentRelationsProcessor || !this.parentComponentManager)
        {
            return;
        }

        this.parentRelationsProcessor.destroyComponent(this.id);
        this.parentComponentManager.unregisterComponent(this.id);
    }
}