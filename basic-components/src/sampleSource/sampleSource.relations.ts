import {SimpleChanges} from '@angular/core';
import {DynamicOutput, PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';

/**
 * SAMPLE source relations component
 */
@PureRelationsComponent()
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