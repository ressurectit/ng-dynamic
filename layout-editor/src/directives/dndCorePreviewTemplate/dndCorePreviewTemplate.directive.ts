import {Directive, Input, TemplateRef} from '@angular/core';

import {DndCorePreviewTemplateContext} from './dndCorePreviewTemplate.context';

/**
 * Directive that marks attached element as html 5 drag preview template
 */
@Directive(
{
    selector: '[dndCorePreviewTemplate]',
})
export class DndCorePreviewTemplateDirective
{
    //######################### public properties - inputs #########################

    /**
     * Type of drag data
     */
    @Input('dndCorePreviewTemplateType')
    public type: string|undefined|null;

    //######################### constructor #########################
    constructor(public template: TemplateRef<DndCorePreviewTemplateContext>,)
    {
    }

    //######################### ng language server #########################

    /**
     * Allows typechecking for template
     */
    static ngTemplateContextGuard(_dir: DndCorePreviewTemplateDirective, _ctx: unknown): _ctx is DndCorePreviewTemplateContext
    {
        return true;
    }
}