import {Injector, SimpleChanges} from '@angular/core';
import {defineSkipInitProp, RelationsComponent, RelationsComponentManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata, RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {Subject} from 'rxjs';

import {ComponentOutputsRelationsMetadataLoader} from './componentOutputs.metadata';
import {ComponentOutputsRelationsOptions} from './componentOutputs.options';

/**
 * Relations used for connecting relations outputs with external relations
 */
@RelationsEditorMetadata(ComponentOutputsRelationsMetadataLoader)
export class ComponentOutputsRelations implements RelationsComponent<ComponentOutputsRelationsOptions>
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
     * Id of component outputs relations
     */
    protected id: string = '';

    /**
     * Instance of custom component that uses these outputs
     */
    protected customComponent: any;

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: ComponentOutputsRelationsOptions|undefined|null;
    
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
            this.customComponent[key] = changes[key].currentValue;
            this.customComponent[`${key}Change`]?.next?.();
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
     * Initialize outputs for component
     * @param outputRelations - Output relations metadata
     * @param id - Id of output relations
     */
    public async initOutputs(outputRelations: RelationsNodeMetadata<ComponentOutputsRelationsOptions>,
                             id: string,
                             customComponent: any): Promise<void>
    {
        this.id = id;
        this.customComponent = customComponent;

        if(!this.componentManager || !this.relationsProcessor)
        {
            return;
        }

        for(const output of outputRelations.relationsOptions?.outputs ?? [])
        {
            Object.defineProperty(this.customComponent,
                                  output.name,
                                  {
                                      value: output.defaultValue,
                                      writable: true,
                                  });

            Object.defineProperty(this.customComponent,
                                  `${output.name}Change`,
                                  {
                                      value: new Subject()
                                  });

            if(output.skipInit)
            {
                defineSkipInitProp(this.customComponent, output.name);
            }
        }

        this.componentManager.registerComponent(this.id, this);
        await this.relationsProcessor.initialized;
        this.relationsProcessor.updateRelations(this.id);
    }
}