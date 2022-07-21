import {DynamicItemMetadata} from '@anglr/dynamic';

/**
 * Metadata for input relation
 */
export interface RelationInputMetadata
{
    /**
     * Name of input be used as relation target
     */
    inputName: string;

    /**
     * Id of component which contains this input
     */
    id: string;
}

/**
 * Metadata for output relation
 */
export interface RelationOutputMetadata
{
    /**
     * Name of output to be used as relation source
     */
    outputName: string;

    /**
     * Array of inputs that are relation targets for this output
     */
    inputs: RelationInputMetadata[];
}

/**
 * Metadata for component relations
 */
export interface RelationsComponentMetadata<TOptions = any> extends DynamicItemMetadata
{
    /**
     * Options passed to relations component
     */
    relationsOptions: TOptions|undefined|null;

    /**
     * Definition of all outputs and their relations
     */
    outputs?: RelationOutputMetadata[];
}
