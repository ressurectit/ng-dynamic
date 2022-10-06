import {DynamicItem} from '@anglr/dynamic';

/**
 * Component decorated with its own id
 */
export interface ComponentWithId extends DynamicItem
{
    /**
     * Id of component
     */
    readonly id: string;

    /**
     * Sets id of component to component
     * @param id - Id of component
     */
    setId(id: string): void;
}