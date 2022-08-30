import {Injectable} from '@angular/core';
import {CustomComponentsRegister} from '@anglr/dynamic/layout-relations';

//TODO: rename

/**
 * Demo relations components register
 */
@Injectable()
export class DemoRelationsComponentsRegister extends CustomComponentsRegister
{
    //######################### public methods - overrides #########################

    /**
     * Gets registered components
     */
    public override getRegisteredComponents(): string[]
    {
        return ['component'];
    }
}