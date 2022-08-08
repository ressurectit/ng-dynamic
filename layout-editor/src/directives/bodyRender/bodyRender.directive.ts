import {Directive, EmbeddedViewRef, Inject, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';

/**
 * Renders element into body directly at the end
 */
@Directive(
{
    selector: '[bodyRender]',
    standalone: true
})
export class BodyRenderSADirective implements OnInit, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Instance of created embedded view
     */
    protected view: EmbeddedViewRef<void>|undefined|null;

    /**
     * Instance of created element
     */
    protected element: HTMLElement|undefined|null;

    //######################### constructor #########################
    constructor(protected template: TemplateRef<void>,
                protected viewContainer: ViewContainerRef,
                @Inject(DOCUMENT) protected document: Document,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.view = this.viewContainer
            .createEmbeddedView(this.template);

        this.element = this.view.rootNodes[0] as HTMLElement;
        this.document.body.appendChild(this.element);
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.element?.remove();
        this.element = null;
        this.view?.destroy();
        this.view = null;
    }
}