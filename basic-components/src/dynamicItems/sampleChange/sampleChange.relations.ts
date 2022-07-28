import {SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {SampleChangeRelationsMetadataLoader} from './sampleChange.metadata';

/**
 * SAMPLE change relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(SampleChangeRelationsMetadataLoader)
export class SampleChangeRelations implements RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public properties - inputs #########################
    
    /**
     * Test input property
     */
    public vstup: string = '';

    //######################### public properties - dynamic outputs #########################

    /**
     * Test output property
     */
    @DynamicOutput()
    public vystup: string = '';

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<SampleChangeRelations>('vstup') in changes)
        {
            console.log('value changes', this.vstup);

            this.vystup = `${this.vstup} changes!`;
        }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}