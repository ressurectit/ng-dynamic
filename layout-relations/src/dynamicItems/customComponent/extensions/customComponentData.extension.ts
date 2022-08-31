import {DynamicItemExtension, DynamicItemExtensionBase} from '@anglr/dynamic';

import type {CustomComponentSAComponent} from '../customComponent.component';
import {CustomComponentDataExtensionOptions} from '../customComponentExtensions.options';

/**
 * Extension that sets custom component data to instance
 */
export class CustomComponentDataExtension extends DynamicItemExtensionBase<CustomComponentDataExtensionOptions, CustomComponentSAComponent> implements DynamicItemExtension<CustomComponentDataExtensionOptions, CustomComponentSAComponent>
{
    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override async onInit(): Promise<void>
    {
        if(this.instance)
        {
            this.instance.setId(this.metadata.id);
            await this.instance.processCustomComponentData(this.metadata.name);
        }
    }
}