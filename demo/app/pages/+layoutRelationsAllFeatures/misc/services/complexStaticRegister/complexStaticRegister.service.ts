import {Injectable, Type} from '@angular/core';
import {StaticComponentsRegister as Register} from '@anglr/dynamic/relations-editor';
import {Dictionary} from '@jscrpt/common';

import {StaticInputSAComponent} from '../../components/staticInput/staticInput.component';
import {StaticOutputSAComponent} from '../../components/staticOutput/staticOutput.component';

/**
 * Static components register for relations complex sample
 */
@Injectable()
export class ComplexStaticRegister extends Register
{
    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected getDefinedTypes(): Dictionary<Type<any>>
    {
        const result: Dictionary<Type<any>> = {};

        result[StaticInputSAComponent.relationsId] = StaticInputSAComponent;
        result[StaticOutputSAComponent.relationsId] = StaticOutputSAComponent;

        return result;
    }
}