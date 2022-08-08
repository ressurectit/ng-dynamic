import {ContentChild, Directive, ElementRef, EmbeddedViewRef, Input, OnDestroy, OnInit} from '@angular/core';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {Subscription} from 'rxjs';

/**
 * Applies min dimensions to designed element, so it can be visible event when it is empty
 */
@Directive(
{
    selector: '[designerMinWidth]',
    standalone: true
})
export class DesignerMinDimensionSADirective implements OnInit, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Instance of mutation observer
     */
    protected observer?: MutationObserver;

    /**
     * Indication whether is min dimensions active
     */
    protected active: boolean = false;

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    //######################### protected properties - children #########################

    /**
     * Instance of layout component renderer
     */
    @ContentChild(LayoutComponentRendererSADirective, {static: true})
    protected layoutComponentRendererDirective?: LayoutComponentRendererSADirective;

    //######################### public properties - inputs #########################

    /**
     * Indication whether is flow of this component horizontal or vertical
     */
    @Input()
    public horizontal: boolean = false;

    /**
     * Indication whether can drop children inside of this
     */
    @Input()
    public canDrop: boolean = false;

    //######################### constructor #########################
    constructor(protected _element: ElementRef<HTMLElement>,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.observer = new MutationObserver(changes =>
        {
            for(const change of changes)
            {
                if(change.target instanceof HTMLElement)
                {
                    this.updatedDimensions(change.target);
                }
            }
        });

        this.initSubscriptions.add(this.layoutComponentRendererDirective?.componentChange.subscribe(componentRef =>
        {
            if(!componentRef)
            {
                this.observer?.disconnect();

                return;
            }

            const element = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

            this.updatedDimensions(element);

            this.observer?.observe(element,
            {
                childList: true,
            });
        }));
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.observer?.disconnect();
        this.initSubscriptions.unsubscribe();
    }

    //######################### protected methods #########################

    /**
     * Updates min dimensions if empty
     * @param element - Element to be checked for changes
     */
    protected updatedDimensions(element: HTMLElement): void
    {
        console.log('update', element.children, this.active);

        if((element.children.length && !this.active) ||
           (!element.children.length && this.active) ||
           !this.canDrop)
        {
            return;
        }

        //TODO: handle existing min width and min height

        //deactivate, children are present
        if(element.children.length)
        {
            //only placeholder is present
            if(element.children.length === 1 && element.children.item(0)?.classList.contains('drag-placeholder'))
            {
                return;
            }

            this.active = false;

            if(this.horizontal)
            {
                element.style.minWidth = '';
            }
            else
            {
                element.style.minHeight = '';
            }
        }
        //activate, children are not present
        else
        {
            this.active = true;

            if(this.horizontal)
            {
                element.style.minWidth = '30px';
            }
            else
            {
                element.style.minHeight = '30px';
            }
        }
    }
}