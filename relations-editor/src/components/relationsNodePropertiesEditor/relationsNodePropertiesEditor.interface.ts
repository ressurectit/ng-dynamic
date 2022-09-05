/**
 * Relations node properties that can be edited
 */
export interface RelationsNodeProperties
{
    /**
     * Display name of relations component
     */
    displayName: string|undefined|null;

    /**
     * Scope that is being used by relations component
     */
    scope: string|undefined|null;
}

/**
 * Data for configure relations node properties
 */
export interface RelationsNodePropertiesEditorData
{
    /**
     * Properties that can be edited
     */
    properties: RelationsNodeProperties;

    /**
     * Indication whether scope can be changed
     */
    scopeConfigurable: boolean;
}