import {Directive, TemplateRef} from '@angular/core';

import {ComponentTreeNodeTemplateContext} from './componentTreeNodeTemplate.context';

/**
 * Directive that serves as template for component tree node
 */
@Directive(
{
    selector: '[treeNodeTemplate]',
    exportAs: 'treeNodeTemplate',
    standalone: true,
})
export class ComponentTreeNodeTemplateSADirective
{
    //######################### constructor #########################
    constructor(public template: TemplateRef<ComponentTreeNodeTemplateContext>)
    {
    }

    //######################### ng language server #########################
    
    /**
     * Allows typechecking for template
     */
    static ngTemplateContextGuard(_dir: ComponentTreeNodeTemplateSADirective, _ctx: unknown): _ctx is ComponentTreeNodeTemplateContext
    {
        return true;
    }
}