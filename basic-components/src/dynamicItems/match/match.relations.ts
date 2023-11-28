import {SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {isString, nameof} from '@jscrpt/common';
import isEqual from 'lodash-es/isEqual';

import {MatchRelationsMetadataLoader} from './match.metadata';

/**
 * Match relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(MatchRelationsMetadataLoader)
export class MatchRelations implements RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public properties - inputs #########################
    
    /**
     * Input value to be checked for match
     */
    public value: unknown;

    /**
     * Value to match
     */
    public valueToMatch: unknown;

    //######################### public properties - dynamic outputs #########################

    /**
     * Negated condition value
     */
    @DynamicOutput()
    public result: boolean|undefined|null;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<MatchRelations>('value') in changes ||
           nameof<MatchRelations>('valueToMatch') in changes)
        {
            if (this.valueToMatch instanceof RegExp &&
                isString(this.value))
            {
                this.result = this.valueToMatch.test(this.value);
                return;
            }

            if (isString(this.value) ||
                isString(this.valueToMatch))
            {
                this.result = this.value == this.valueToMatch;
                return;
            }

            this.result = isEqual(this.value, this.valueToMatch);
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}