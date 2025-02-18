import type {LayoutDesignerDirective} from '../../directives';

/**
 * Definition of component for LayoutEditorMetadataManager
 */
export interface LayoutEditorMetadataManagerComponent
{
    /**
     * Reference to parent component
     */
    parent: LayoutEditorMetadataManagerComponent|undefined|null;

    /**
     * Reference to children components
     */
    children: LayoutEditorMetadataManagerComponent[];

    /**
     * Instance of component itself
     */
    component: LayoutDesignerDirective;
}