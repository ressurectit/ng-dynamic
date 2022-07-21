import {Injector} from '@angular/core';
import {DynamicItemExtension} from '@anglr/dynamic';

// import {RelationsComponentManager, RelationsProcessor} from '../../services';

//TODO: base class for extensions
//TODO: refactore layout component

/**
 * Extension that allows registration of component for relations
 */
export class RelationsRegistrationExtension implements DynamicItemExtension
{
    //######################### protected fields #########################

    /**
     * Injector from extended component
     */
    protected _injector?: Injector;

    /**
     * Indication whether was extension initialized
     */
    protected _initialized: boolean = false;

    //######################### public methods - implementation of DynamicItemExtension #########################

    /**
     * @inheritdoc
     */
    public async initialize(injector: Injector): Promise<void>
    {
        this._initialized = true;

        this._injector = injector;
        // const relationsProcessor: RelationsProcessor = this._injector.get(RelationsProcessor);
        // const componentManager: RelationsComponentManager = this._injector.get(RelationsComponentManager);

        // componentManager.registerComponent(RelationsSampleClickComponent.relationsId, this);
        // await relationsProcessor.initialized;
        // relationsProcessor.updateRelations(RelationsSampleClickComponent.relationsId);
    }

    /**
     * @inheritdoc
     */
    public optionsChange(): void
    {
    }

    /**
     * @inheritdoc
     */
    public destroy(): void
    {
        if(this._injector)
        {
            // const relationsProcessor: RelationsProcessor = this._injector.get(RelationsProcessor);
            // const componentManager: RelationsComponentManager = this._injector.get(RelationsComponentManager);

            // relationsProcessor.destroyComponent(RelationsSampleClickComponent.relationsId);
            // componentManager.unregisterComponent(RelationsSampleClickComponent.relationsId);
        }
    }
}