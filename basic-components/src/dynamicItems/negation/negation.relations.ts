import {SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {NegationRelationsMetadataLoader} from './negation.metadata';

/**
 * Negation relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(NegationRelationsMetadataLoader)
export class NegationRelations implements RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public properties - inputs #########################
    
    /**
     * Condition which value will be negated
     */
    public condition?: boolean;

    //######################### public properties - dynamic outputs #########################

    /**
     * Negated condition value
     */
    @DynamicOutput()
    public negatedCondition: boolean|undefined|null;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public dynamicOnChanges(changes: SimpleChanges): void
    {
        if(nameof<NegationRelations>('condition') in changes)
        {
            this.negatedCondition = !this.condition;
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}