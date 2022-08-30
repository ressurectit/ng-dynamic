import {ContentChild, Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {nameof} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {LayoutEditorMetadataDescriptor} from '../../decorators';

/**
 * Applies min dimensions to designed element, so it can be visible event when it is empty
 */
@Directive(
{
    selector: '[designerMinWidth]',
    standalone: true
})
export class DesignerMinDimensionSADirective implements OnInit, OnDestroy, OnChanges
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

    /**
     * Html element of dynamic component
     */
    protected element: HTMLElement|undefined|null;

    /**
     * Minimal height of element
     */
    protected minHeight: string = '';

    /**
     * Minimal width of element
     */
    protected minWidth: string = '';

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

    /**
     * Layout editor metadata
     */
    @Input()
    public editorMetadata: LayoutEditorMetadataDescriptor|null = null;

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

        this.initSubscriptions.add(this.layoutComponentRendererDirective?.componentElementChange.subscribe(element =>
        {
            if(!element)
            {
                this.observer?.disconnect();

                return;
            }

            this.element = element;
            this.init();
        }));
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<DesignerMinDimensionSADirective>('editorMetadata') in changes)
        {
            this.init();
        }
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
     * Initialize watching for children
     */
    protected init(): void
    {
        if(!this.element || !this.editorMetadata)
        {
            return;
        }

        const element = this.editorMetadata.getChildrenContainer?.(this.element) as HTMLElement ?? this.element;

        this.minHeight = element.style.minHeight;
        this.minWidth = element.style.minWidth;
        
        this.updatedDimensions(element);

        this.observer?.observe(element,
        {
            childList: true,
        });
    }

    /**
     * Updates min dimensions if empty
     * @param element - Element to be checked for changes
     */
    protected updatedDimensions(element: HTMLElement): void
    {
        const nodesArray: ChildNode[] = [];
        element.childNodes.forEach(node => nodesArray.push(node));

        const contentsLength = nodesArray.filter(itm => itm.nodeName != '#comment').length;

        if((contentsLength && !this.active) ||
           (!contentsLength && this.active))
        {
            return;
        }

        //deactivate, children are present
        if(contentsLength)
        {
            //only placeholder is present
            if(element.children.length === 1 && element.children.item(0)?.classList.contains('drag-placeholder'))
            {
                return;
            }

            this.active = false;

            if(this.horizontal)
            {
                element.style.minWidth = this.minWidth;
            }
            else
            {
                element.style.minHeight = this.minHeight;
            }
        }
        //activate, children are not present
        else
        {
            this.active = true;

            if(this.horizontal)
            {
                element.style.minWidth = this.canDrop ? '30px' : '10px';
            }
            else
            {
                element.style.minHeight = this.canDrop ? '30px' : '10px';
            }
        }
    }
}