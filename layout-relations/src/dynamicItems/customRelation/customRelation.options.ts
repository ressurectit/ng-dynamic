/**
 * Options for custom relation relations
 */
export interface CustomRelationRelationsOptions
{
    /**
     * Name of custom relation, used for obtaining metadata in runtime
     */
    name: string;

    /**
     * Id of custom relation, used for registration of this relation in runtime
     */
    id: string;
}