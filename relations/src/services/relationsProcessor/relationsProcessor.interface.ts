import {SimpleChanges} from '@angular/core';
import {Dictionary} from '@jscrpt/common';

import {RelationsComponentType} from '../../interfaces';

/**
 * Instruction containing data/changes that are needed for data transfer
 */
export interface RelationsDataTransferInstruction
{
    /**
     * Changes that are coming into component
     */
    readonly changes: SimpleChanges;

    /**
     * Target that should be triggered with changes
     */
    applyChanges(): void;
}

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
     * Indication whether there was already initial data transfer, for relations identified by input component id and output component id
     */
    initialized: Dictionary<boolean>;
}

/**
 * Metadata for single component relations
 */
export interface RelationsProcessorComponentData<TOptions = any>
{
    /**
     * Indication whether was relations component automatically created or existing one was used
     */
    autoCreated: boolean;

    /**
     * Indication whether is this relations component in scope
     */
    scope: string|null;

    /**
     * Type that is used for creating relations component
     */
    componentType: RelationsComponentType|null;

    /**
     * Definition of all outputs and their connections to inputs
     */
    inputOutputs?: RelationsProcessorInputOutputData[];

    /**
     * Instance of options stored in metadata used for initialization
     */
    metadataOptions: TOptions;
}