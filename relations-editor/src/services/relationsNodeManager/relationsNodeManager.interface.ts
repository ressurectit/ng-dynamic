import type {NodeRelationPath} from '../../misc/nodeRelationPath';

/**
 * Waiting input relation data
 */
export interface WaitingInputRelation
{
    /**
     * Name of input for which is relation waiting
     */
    inputName: string;

    /**
     * Output object with waiting relation
     */
    relation: NodeRelationPath;
}
