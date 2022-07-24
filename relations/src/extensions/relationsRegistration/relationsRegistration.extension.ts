import {DynamicItemExtension, DynamicItemExtensionBase} from '@anglr/dynamic';

import {RelationsComponent} from '../../interfaces';
import {RelationsComponentManager, RelationsProcessor} from '../../services';

/**
 * Extension that allows registration of component for relations
 */
export class RelationsRegistrationExtension extends DynamicItemExtensionBase<unknown, RelationsComponent> implements DynamicItemExtension<unknown, RelationsComponent>
{
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

        const relationsProcessor: RelationsProcessor|null = this._injector.get(RelationsProcessor, null);
        const componentManager: RelationsComponentManager|null = this._injector.get(RelationsComponentManager, null);

        if(!relationsProcessor || !componentManager)
        {
            return;
        }

        componentManager.registerComponent(this._metadata.id, this._instance);
        await relationsProcessor.initialized;
        relationsProcessor.updateRelations(this._metadata.id);
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

        const relationsProcessor: RelationsProcessor|null = this._injector.get(RelationsProcessor, null);
        const componentManager: RelationsComponentManager|null = this._injector.get(RelationsComponentManager, null);

        if(!relationsProcessor || !componentManager)
        {
            return;
        }

        relationsProcessor.destroyComponent(this._metadata.id);
        componentManager.unregisterComponent(this._metadata.id);
    }
}