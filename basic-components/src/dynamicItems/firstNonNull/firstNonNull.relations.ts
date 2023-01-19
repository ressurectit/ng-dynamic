import {SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {FirstNonNullRelationsMetadataLoader} from './firstNonNull.metadata';
import {FirstNonNullRelationsOptions} from './firstNonNull.options';

/**
 * First non null relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(FirstNonNullRelationsMetadataLoader)
export class FirstNonNullRelations implements RelationsComponent<FirstNonNullRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: FirstNonNullRelationsOptions|undefined|null;

    //######################### public properties - inputs #########################
    
    /**
     * First data to be cheched
     */
    public data1: unknown;

    /**
     * Next data to be checked
     */
    public data2: unknown;

    //######################### public properties - dynamic outputs #########################

    /**
     * Resulting data
     */
    @DynamicOutput()
    public data: unknown;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<FirstNonNullRelations>('data1') in changes || nameof<FirstNonNullRelations>('data2') in changes)
        {
            if(this.data1)
            {
                this.data = this.data1;
            }
            else if(this.data2)
            {
                this.data = this.data2;
            }
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}