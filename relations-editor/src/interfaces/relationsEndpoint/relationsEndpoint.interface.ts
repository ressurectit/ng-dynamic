import type {NodeRelationPath} from '../../misc/nodeRelationPath';

/**
 * Describes relations endpoint (input/output)
 */
export interface RelationsEndpoint
{
    /**
     * Name of endpoint
     */
    readonly name: string|undefined|null;

    /**
     * Id of parent relations node
     */
    readonly parentId: string;

    /**
     * Updates relation coordinates
     */
    updateRelation(): void;
}

/**
 * Describes relations input endpoint
 */
export interface RelationsInput extends RelationsEndpoint
{
    /**
     * Ends relation with this input
     * @param relation - Relation that will end up in this input
     */
    endRelation(relation: NodeRelationPath): void;
}

/**
 * Describes relations output endpoint
 */
export interface RelationsOutput extends RelationsEndpoint
{
    /**
     * Starts new relation from this output
     */
    startRelation(): NodeRelationPath;
}