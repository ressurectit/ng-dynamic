import {Injectable, Type} from '@angular/core';
import {StaticComponentsRegister as Register} from '@anglr/dynamic/relations-editor';
import {Dictionary} from '@jscrpt/common';

import {RelationsResultComponent, RelationsSampleClickComponent} from '../../components';

/**
 * Static components register for demo app
 */
@Injectable()
export class StaticComponentsRegister extends Register
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected getDefinedTypes(): Dictionary<Type<any>>
    {
        const result: Dictionary<Type<any>> = {};

        result[RelationsResultComponent.relationsId] = RelationsResultComponent;
        result[RelationsSampleClickComponent.relationsId] = RelationsSampleClickComponent;

        return result;
    }
}