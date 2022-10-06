import {DynamicItemExtension, DynamicItemExtensionBase} from '@anglr/dynamic';

import {ComponentWithId} from '../../interfaces';

/**
 * Extension that sets id of component to instance of component
 */
export class IdSetterExtension extends DynamicItemExtensionBase<unknown, ComponentWithId> implements DynamicItemExtension<unknown, ComponentWithId>
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