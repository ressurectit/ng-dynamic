import {Dictionary, StringDictionary} from '@jscrpt/common';

/**
 * Options for state relations
 */
export interface StateRelationsOptions
{
    inputFunctions: Dictionary<StateRelationsInputFunctionData>|undefined|null;
}

/**
 * Definition of input function data for state relations
 */
export interface StateRelationsInputFunctionData
{
    /**
     * Unique id that is generated for code
     */
    id: string;

    /**
     * Code that should be executed for input function
     */
    code: string|undefined|null;
}

/**
 * Options for state relations
 */
export interface StateRelationsEditorOptions
{
    /**
     * Contents of code editor that is being compiled, according input function
     */
    contents: StringDictionary|undefined|null;
}

