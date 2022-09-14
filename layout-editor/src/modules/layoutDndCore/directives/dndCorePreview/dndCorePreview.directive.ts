import {Directive, EmbeddedViewRef, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

/**
 * Directive that marks attached element as html 5 drag preview
 */
@Directive(
{
    selector: '[dndCorePreview]'
})
export class DndCorePreviewDirective implements OnInit, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Instance of created template
     */
    protected templateRef: EmbeddedViewRef<void>|undefined|null;

    /**
     * Html element representing contents of template
     */
    protected element: HTMLElement|undefined|null;

    //######################### constructor #########################
    constructor(protected template: TemplateRef<void>,
                protected viewContainer: ViewContainerRef,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.templateRef = this.viewContainer.createEmbeddedView(this.template);
        this.element = this.templateRef.rootNodes[0];

        if(this.element)
        {
            document.body.append(this.element);
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.element?.remove();
        this.element = null;

        this.templateRef?.destroy();
        this.templateRef = null;
    }
}