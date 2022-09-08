/**
 * Options for transform data relations
 */
export interface TransformDataRelationsOptions
{
    /**
     * Unique id that is generated for code
     */
    id: string;

    /**
     * Code that should be executed for data transformation
     */
    code: string;
}

/**
 * Options for transform data relations
 */
export interface TransformDataRelationsEditorOptions
{
    /**
     * Contents of code editor that is being compiled
     */
    content: string;
}