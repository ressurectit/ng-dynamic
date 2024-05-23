export interface Schema
{
    /**
     * The name of the component.
     */
    name: string;

    /**
    * The path at which to create the component, relative to the workspace root.
    */
    path?: string;

    /**
    * Component type.
    */
    type: ComponentType;

    /**
     * Project
     */
    project?: string;
}

/**
 * Component type.
 */
export declare enum ComponentType {
    Layout = 'layout',
    Relations = 'relations',
    LayoutRelations = 'layout-relations'
}
