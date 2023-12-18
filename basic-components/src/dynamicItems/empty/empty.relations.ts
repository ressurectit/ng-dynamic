import {SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';
import isEmpty from 'lodash-es/isEmpty';

import {EmptyRelationsMetadataLoader} from './empty.metadata';

/**
 * Empty relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(EmptyRelationsMetadataLoader)
export class EmptyRelations implements RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public properties - inputs #########################
    
    /**
     * Input value to be checked
     */
    public value: unknown;

    //######################### public properties - dynamic outputs #########################

    /**
     * Indication whether input value is empty
     */
    @DynamicOutput()
    public result: boolean|undefined|null = true;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public dynamicOnChanges(changes: SimpleChanges): void
    {
        if(nameof<EmptyRelations>('value') in changes)
        {
            this.result = isEmpty(this.value);
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}