import type {NodeRelationPath} from '../../misc/nodeRelationPath';
import {Coordinates} from '../coordinates/coordinates.interface';

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

    /**
     * Gets node coordinates
     */
    getCoordinates(): Coordinates;

    /**
     * Highlight relation endpoint
     */
    highlight(): void;

    /**
     * Cancels relation endpoint highligh
     */
    cancelHighlight(): void;
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

    /**
     * Adds new relation, and returns true if relation was added, otherwise false
     * @param relation - Relations to be added
     */
    addRelation(relation: NodeRelationPath): boolean;
}

/**
 * Describes relations output endpoint
 */
export interface RelationsOutput extends RelationsEndpoint
{
    /**
     * Array of relations for this output
     */
    readonly relations: NodeRelationPath[];

    /**
     * Starts new relation from this output
     */
    startRelation(): NodeRelationPath;
}