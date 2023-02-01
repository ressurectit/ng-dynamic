import {SimpleChange} from '@angular/core';
import {Dictionary} from '@jscrpt/common';

/**
 * Adds unique id to transfer
 */
export interface RelationsDataTransferIdDebugInfo
{
    /**
     * Unique id for data transfer
     */
    ɵuniqueId: string;
}

/**
 * Information about input and its component and data transfered
 */
export interface RelationsDataTransferDebugInfo
{
    /**
     * Object storing change that are transfered to target object
     */
    change: SimpleChange;

    /**
     * Information about scoped data transfers
     */
    scope: string|undefined|null;

    /**
     * Id of output component that has initiated data transfer
     */
    outputComponentId: string;

    /**
     * Name of output that has changed
     */
    outputName: string;

    /**
     * Id of component that has been created
     */
    inputComponentId: string;

    /**
     * Name of input that has changed
     */
    inputName: string;
}

/**
 * Information about input and its component and data transfered
 */
export interface RelationsComponentRegistrationDebugInfo
{
    /**
     * Id of component that has been created
     */
    componentId: string;

    /**
     * Internal id, used for identification of component within the scope
     */
    componentInternalId: string;
}

/**
 * Information about relations output
 */
export interface RelationsOutputDebugInfo
{
    /**
     * Value of output
     */
    value: unknown;

    /**
     * Value of flag, whether skip init for this output
     */
    skipInit: boolean|undefined;

    /**
     * Indication whether was value at least once assigned
     */
    assigned: boolean|undefined;
}

/**
 * Information about component state during relations debugging
 */
export interface RelationsComponentStateDebugInfo extends RelationsComponentRegistrationDebugInfo
{
    /**
     * Storing values for inputs that has changed recently
     */
    inputs: Dictionary;

    /**
     * Storing output values that has changes recently
     */
    outputs: Dictionary<RelationsOutputDebugInfo>;
}

/**
 * Information about single step that occured in relations during debugging
 */
export interface RelationsStepDebugInfo
{
    /**
     * Timestamp when event occured
     */
    timestamp: number;

    /**
     * Information about data transfer that happened
     */
    dataTransfer: RelationsDataTransferDebugInfo&RelationsDataTransferIdDebugInfo|undefined|null;

    /**
     * Information about component registration
     */
    componentRegistration: RelationsComponentRegistrationDebugInfo|undefined|null;

    /**
     * Information about component unregistration
     */
    componentUnregistration: RelationsComponentRegistrationDebugInfo|undefined|null;

    /**
     * Component state changes
     */
    componentState: Dictionary<RelationsComponentStateDebugInfo[]>|undefined|null;

    /**
     * Instance of component relations options
     */
    componentRelationsOptions: Dictionary|undefined|null;

    /**
     * Information about previous step
     */
    previousStep: RelationsStepDebugInfo|undefined|null;
}
