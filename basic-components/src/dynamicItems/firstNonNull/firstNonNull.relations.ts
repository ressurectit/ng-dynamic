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
    public data1: any = null;

    /**
     * Next data to be checked
     */
    public data2: any = null;

    //######################### public properties - dynamic outputs #########################

    /**
     * Resulting data
     */
    @DynamicOutput()
    public data: any = null;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<FirstNonNullRelations>('data1') in changes && this.data1)
        {
            this.data = this.data1;

            return;
        }

        if(nameof<FirstNonNullRelations>('data2') in changes && this.data2)
        {
            this.data = this.data2;

            return;
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}