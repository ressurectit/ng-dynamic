import {Directive, TemplateRef} from '@angular/core';

/**
 * Directive that marks attached element as html 5 drag preview template
 */
@Directive(
{
    selector: '[dndCorePreviewTemplate]'
})
export class DndCorePreviewTemplateDirective
{
    //######################### constructor #########################
    constructor(public template: TemplateRef<void>,)
    {
    }
}