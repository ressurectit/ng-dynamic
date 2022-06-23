import {LayoutEditorMetadataManagerComponent} from '../../services';

/**
 * Context passed to template of component tree node
 */
export interface ComponentTreeNodeTemplateContext
{
    /**
     * Layout editor metadata manager component
     */
    $implicit: LayoutEditorMetadataManagerComponent;

    /**
     * Margin that is rendered from left indicating depth of node in tree
     */
    margin: number;
}