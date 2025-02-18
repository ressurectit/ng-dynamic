import {DynamicItemExtension, DynamicItemExtensionBase} from '@anglr/dynamic';

import {ListBlockComponent} from '../listBlock.component';
import {ListBlockDataExtensionOptions} from '../listBlockExtensions.options';

//TODO: id use id setter extension

/**
 * Extension that sets custom component data to instance
 */
export class ListBlockDataExtension extends DynamicItemExtensionBase<ListBlockDataExtensionOptions, ListBlockComponent> implements DynamicItemExtension<ListBlockDataExtensionOptions, ListBlockComponent>
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
        }
    }
}