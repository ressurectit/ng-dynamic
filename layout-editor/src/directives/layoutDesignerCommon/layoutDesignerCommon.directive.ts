import {Directive, ElementRef, inject} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';

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

    /**
     * Instance of logger
     */
    protected ɵlogger: Logger = inject(LOGGER);

    //######################### public properties #########################
    
    /**
     * Gets instance of components element
     */
    public get element(): ElementRef<HTMLElement>
    {
        return this.ɵelement;
    }

    /**
     * Gets instance of logger
     */
    public get logger(): Logger
    {
        return this.ɵlogger;
    }
}