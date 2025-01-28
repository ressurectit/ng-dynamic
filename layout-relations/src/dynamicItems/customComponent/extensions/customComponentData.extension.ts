import {DynamicItemExtension, DynamicItemExtensionBase} from '@anglr/dynamic';

import type {CustomComponentComponent} from '../customComponent.component';
import {CustomComponentDataExtensionOptions} from '../customComponentExtensions.options';

/**
 * Extension that sets custom component data to instance
 */
export class CustomComponentDataExtension extends DynamicItemExtensionBase<CustomComponentDataExtensionOptions, CustomComponentComponent> implements DynamicItemExtension<CustomComponentDataExtensionOptions, CustomComponentComponent>
{
    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override async onInit(): Promise<void>
    {
        if(this.instance)
        {
            await this.instance.processCustomComponentData(this.metadata.name);
        }
    }
}