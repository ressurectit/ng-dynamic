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
    protected override async _onInit(): Promise<void>
    {
        if(!this._injector || !this._metadata || !this._instance)
        {
            return;
        }

        this.relationsProcessor ??= this._injector.get(RelationsProcessor, null);
        this.componentManager ??= this._injector.get(RelationsComponentManager, null);

        if(!this.relationsProcessor || !this.componentManager)
        {
            return;
        }

        this.componentManager.registerComponent(this._metadata.id, this._instance);
        await this.relationsProcessor.initialized;
        this.relationsProcessor.updateRelations(this._metadata.id);
    }

    /**
     * @inheritdoc
     */
    protected override _onDestroy(): void
    {
        if(!this._injector || !this._metadata)
        {
            return;
        }

        if(!this.relationsProcessor || !this.componentManager)
        {
            return;
        }

        this.relationsProcessor.destroyComponent(this._metadata.id);
        this.componentManager.unregisterComponent(this._metadata.id);
    }
}