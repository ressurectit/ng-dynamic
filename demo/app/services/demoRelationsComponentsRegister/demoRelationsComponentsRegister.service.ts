import {Injectable} from '@angular/core';
import {RelationsComponentsRegister} from '@anglr/dynamic/layout-relations';

/**
 * Demo relations components register
 */
@Injectable()
export class DemoRelationsComponentsRegister extends RelationsComponentsRegister
{
    //######################### public methods - overrides #########################

    /**
     * Gets registered components
     */
    protected override getRegisteredComponents(): string[]
    {
        return [];
    }
}