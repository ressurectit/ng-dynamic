import {DynamicFeatureType} from '../enums';

/**
 * 
 */
export class CoreDynamicFeature
{
    //######################### protected fields #########################

    /**
     * Dynamic feature type
     */
    protected ɵtype: DynamicFeatureType;

    //######################### public properties #########################

    /**
     * Gets dynamic feature type
     */
    public get type(): DynamicFeatureType
    {
        return this.ɵtype;
    }

    //######################### constructor #########################
    constructor(type: DynamicFeatureType)
    {
        this.ɵtype = type;
    }
}