import {DynamicItemExtension, DynamicItemExtensionBase} from '@anglr/dynamic';

import {RelationsComponent} from '../../interfaces';
import {RelationsComponentManager, RelationsProcessor} from '../../services';

/**
 * Extension that allows registration of component for relations
 */
export class RelationsRegistrationExtension extends DynamicItemExtensionBase<unknown, RelationsComponent> implements DynamicItemExtension<unknown, RelationsComponent>
{
    //######################### protected properties #########################

    /**
     * Instance of relations processor
     */
    protected relationsProcessor: RelationsProcessor|null = null;

    /**
     * Instance of component manager
     */
    protected componentManager: RelationsComponentManager|null = null;

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override async onInit(): Promise<void>
    {
        if(!this.injector || !this.metadata || !this.instance)
        {
            return;
        }

        this.relationsProcessor ??= this.injector.get(RelationsProcessor, null);
        this.componentManager ??= this.injector.get(RelationsComponentManager, null);

        if(!this.relationsProcessor || !this.componentManager)
        {
            return;
        }

        this.componentManager.registerComponent(this.metadata.id, this.instance);
        await this.relationsProcessor.initialized;
        this.relationsProcessor.updateRelations(this.metadata.id);
    }

    /**
     * @inheritdoc
     */
    protected override onDestroy(): void
    {
        if(!this.relationsProcessor || !this.componentManager || !this.metadata)
        {
            return;
        }

        this.relationsProcessor.destroyComponent(this.metadata.id);
        this.componentManager.unregisterComponent(this.metadata.id);
    }
}