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
}