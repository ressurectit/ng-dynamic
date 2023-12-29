import {Injector, SimpleChanges} from '@angular/core';
import {PureRelationsComponent, RELATIONS_METADATA_STORAGE, RelationsChangeDetector, RelationsComponent, RelationsComponentManager, RelationsManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {MetadataStorage, isDestroyable} from '@anglr/dynamic';

import {CustomRelationRelationsMetadataLoader} from './customRelation.metadata';
import {CustomRelationRelationsOptions} from './customRelation.options';
import {ComponentInputsRelations} from '../componentInputs/componentInputs.relations';
import {ComponentOutputsRelations} from '../componentOutputs/componentOutputs.relations';
import {getInputs, getOutputs} from './customRelation.utils';

/**
 * Custom relation relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(CustomRelationRelationsMetadataLoader)
export class CustomRelationRelations implements RelationsComponent<CustomRelationRelationsOptions>
{
    //######################### protected fields #########################

    /**
     * Instance of inputs relations if it exists
     */
    protected inputsRelations: ComponentInputsRelations|null = null;

    /**
     * Instance of outputs relations if it exists
     */
    protected outputsRelations: ComponentOutputsRelations|null = null;

    /**
     * Storage for relations metadata
     */
    protected relationsMetadataStorage: MetadataStorage<RelationsNodeMetadata[]>|null;

    /**
     * Instance of relations manager
     */
    protected relationsManager: RelationsManager|null;

    /**
     * Parent relations processor instance
     */
    protected parentRelationsProcessor: RelationsProcessor|null;

    /**
     * Parent relations component manager
     */
    protected parentComponentManager: RelationsComponentManager|null;

    /**
     * Instance of injector for custom relation
     */
    protected injector: Injector;

    /**
     * Id of current relation
     */
    public id: string = '';

    /**
     * Value of relations options
     */
    protected ɵrelationsOptions: CustomRelationRelationsOptions|undefined|null;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public get relationsOptions(): CustomRelationRelationsOptions|undefined|null
    {
        return this.ɵrelationsOptions;
    }
    public set relationsOptions(value: CustomRelationRelationsOptions|undefined|null)
    {
        this.ɵrelationsOptions = value;

        this.initialize();
    }

    //######################### constructor #########################
    constructor(protected parentInjector: Injector)
    {
        this.relationsMetadataStorage = this.parentInjector.get(RELATIONS_METADATA_STORAGE, null, {optional: true});
        this.parentRelationsProcessor = this.parentInjector.get(RelationsProcessor, null, {optional: true});
        this.parentComponentManager = this.parentInjector.get(RelationsComponentManager, null, {optional: true});

        //TODO: relations debugger missing
        this.injector = Injector.create(
        {
            parent: this.parentInjector,
            providers:
            [
                RelationsComponentManager,
                RelationsManager,
                RelationsProcessor,
                RelationsChangeDetector,
            ]
        });

        this.relationsManager = this.injector.get(RelationsManager, null, {optional: true});
    }

    //######################### public methods - implementation of DynamicOnChanges #########################

    /**
     * Called before initialization and every time some property changes
     * @param changes - Information about changes that occured
     */
    public async dynamicOnChanges?(changes: SimpleChanges): Promise<void>
    {
        this.inputsRelations?.dynamicOnChanges(changes);
    }

    //######################### public methods - implementation of RelationsOnDestroy #########################

    /**
     * @inheritdoc
     */
    public relationsOnDestroy?(): void
    {
        if(!this.parentRelationsProcessor || !this.parentComponentManager)
        {
            return;
        }

        this.parentRelationsProcessor.destroyComponent(this.id);
        this.parentComponentManager.unregisterComponent(this.id);
        
        if(isDestroyable(this.injector))
        {
            this.injector.destroy();
        }
    }

    //######################### public methods - implementation of Invalidatable #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    //######################### protected methods #########################

    /**
     * Initialize rest relations
     */
    protected async initialize(): Promise<void>
    {
        if(!this.ɵrelationsOptions)
        {
            throw new Error('CustomRelationRelations: missing relations options!');
        }

        this.id = this.ɵrelationsOptions.id;
        let relations: RelationsNodeMetadata[]|null = null;

        //gets and initialize inner relations of custom component
        if(this.relationsManager && this.relationsMetadataStorage)
        {
            relations = await this.relationsMetadataStorage.getMetadata(this.ɵrelationsOptions.name);

            this.relationsManager.setRelations(relations ?? []);
        }

        //if relations available initialize custom component inputs
        if(relations)
        {
            const inputsMeta = getInputs(relations);

            if(inputsMeta)
            {
                this.inputsRelations = new ComponentInputsRelations(this.injector);
                this.inputsRelations.initInputs(inputsMeta, inputsMeta.id);
            }

            const outputsMeta = getOutputs(relations);

            if(outputsMeta)
            {
                this.outputsRelations = new ComponentOutputsRelations(this.injector);
                this.outputsRelations.initOutputs(outputsMeta, outputsMeta.id, this);
            }
        }

        //initialize and register relations from outside world to this custom component
        if(this.parentComponentManager && this.parentRelationsProcessor)
        {
            this.parentComponentManager.registerComponent(this.id, this);
            await this.parentRelationsProcessor.initialized;
            this.parentRelationsProcessor.updateRelations(this.id);
        }
    }
}