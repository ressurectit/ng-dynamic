/**
 * Available types of core dynamic features
 */
export enum DynamicFeatureType
{
    /**
     * No feature available
     */
    None = 0x00,

    /**
     * Layout runtime type
     */
    LayoutRuntime = 0x01,

    /**
     * Relations runtime type
     */
    RelationsRuntime = 0x02,

    /**
     * Layout editor type
     */
    LayoutEditor = 0x04,

    /**
     * Relations editor type
     */
    RelationsEditor = 0x08,
}