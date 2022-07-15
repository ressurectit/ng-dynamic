import {Subscription} from 'rxjs';

/**
 * Metadata for single component`s output for relation manager
 */
export interface RelationsProcessorInputOutputData
{
    /**
     * Name of output to be mapped
     */
    outputName: string;

    /**
     * Name of input be mapped
     */
    inputName: string;

    /**
     * Id of component which contains this input
     */
    inputComponentId: string;

    /**
     * Id of output component which is attached to this input
     */
    outputComponentId: string;

    /**
     * Indication whether there was already initial data transfer, for this relation
     */
    initialized: boolean;
}

/**
 * Metadata for single component relations
 */
export interface RelationsProcessorComponentData
{
    /**
     * Indication whether was relations component automatically created or existing one was used
     */
    autoCreated: boolean;

    /**
     * Definition of all outputs and their connections to inputs
     */
    inputOutputs?: RelationsProcessorInputOutputData[];

    /**
     * Array of subscriptions for changes of outputs for component
     */
    outputsChangeSubscriptions: Subscription[];
}