import {Injector, SimpleChanges} from '@angular/core';
import {RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {Subject} from 'rxjs';

import {ComponentInputsRelationsMetadataLoader} from './componentInputs.metadata';
import {ComponentInputsRelationsOptions} from './componentInputs.options';

/**
 * Relations used for connecting relations inputs with external relations
 */
@RelationsEditorMetadata(ComponentInputsRelationsMetadataLoader)
export class ComponentInputsRelations implements RelationsComponent<ComponentInputsRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Relations processor instance
     */
    protected relationsProcessor: RelationsProcessor|null = this.injector.get(RelationsProcessor, null);

    /**
     * Relations component manager
     */
    protected componentManager: RelationsComponentManager|null = this.injector.get(RelationsComponentManager, null);

    /**
     * Id of component inputs relations
     */
    protected id: string = '';

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: ComponentInputsRelationsOptions|undefined|null;

    //######################### constructor #########################
    constructor(protected injector: Injector,)
    {
    }

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        for(const key of Object.keys(changes))
        {
            const $this = this as any;

            $this[key] = changes[key].currentValue;
            $this[`${key}Change`]?.next?.();
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        if(this.id)
        {
            this.relationsProcessor?.destroyComponent(this.id);
            this.componentManager?.unregisterComponent(this.id);
        }
    }

    //######################### public methods #########################

    /**
     * Initialize inputs for component
     * @param inputRelations - Input relations metadata
     * @param id - Id of input relations
     */
    public async initInputs(inputRelations: RelationsNodeMetadata<ComponentInputsRelationsOptions>,
                            id: string,): Promise<void>
    {
        this.id = id;

        if(!this.componentManager || !this.relationsProcessor)
        {
            return;
        }

        for(const input of inputRelations.relationsOptions?.inputs ?? [])
        {
            Object.defineProperty(this,
                                  input.name,
                                  {
                                      value: input.defaultValue,
                                      writable: true,
                                  });

            Object.defineProperty(this,
                                  `${input.name}Change`,
                                  {
                                      value: new Subject()
                                  });
        }

        this.componentManager.registerComponent(this.id, this);
        await this.relationsProcessor.initialized;
        this.relationsProcessor.updateRelations(this.id);
    }
}