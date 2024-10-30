import {Directive, ElementRef, inject} from '@angular/core';

/**
 * Directive for shared properties among all layout designer directives
 */
@Directive(
{
    selector: '[layoutDesignerCommon]',
    standalone: true,
})
export class LayoutDesignerCommonDirective
{
    //######################### protected fields #########################

    /**
     * Instance of components element
     */
    protected ɵelement: ElementRef<HTMLElement> = inject(ElementRef);

    //######################### public properties #########################
    
    /**
     * Gets instance of components element
     */
    public get element(): ElementRef<HTMLElement>
    {
        return this.ɵelement;
    }
}