import {SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {SampleSourceRelationsMetadataLoader} from './sampleSource.metadata';

/**
 * SAMPLE source relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(SampleSourceRelationsMetadataLoader)
export class SampleSourceRelations implements RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public properties - dynamic outputs #########################

    /**
     * Test output property
     */
    @DynamicOutput()
    public vystup: string = 'super hodnota';

    /**
     * Test output object property
     */
    @DynamicOutput()
    public obj = 
    {
        name: 'kukjevov',
        surname: 'buko',
        man: true,
        address:
        {
            city: 'hz'
        }
    };

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(_changes: SimpleChanges): void
    {
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}