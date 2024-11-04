import {Injectable, NgZone, OnDestroy, Renderer2, inject} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {POSITION, Position, PositionPlacement, applyPositionResult} from '@anglr/common';
import {renderToBody} from '@jscrpt/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';
import {DropTarget} from '@ng-dnd/core';
import {Subscription} from 'rxjs';

import {DndBusService} from '../dndBus/dndBus.service';
import type {LayoutDragItem, LayoutDropResult} from '../../directives';
import {DYNAMIC_BODY_CONTAINER} from '../../../../misc/constants';

/**
 * Class that applies css style update to element
 */
class CssStyleUpdates
{
    //######################### protected fields #########################

    /**
     * Margin side that is set
     */
    protected marginSide: string;

    /**
     * Original margin value before update
     */
    protected originalMargin: string;

    //######################### constructor #########################
    constructor(protected element: HTMLElement,
                protected before: boolean,
                protected requiredSpace: number,
                protected renderer: Renderer2,
                protected horizontal: boolean,)
    {
        this.marginSide = (this.horizontal ? (this.before ? 'Left' : 'Right') : (this.before ? 'Top' : 'Bottom'));
        this.originalMargin = this.element.style[`margin${this.marginSide}` as keyof CSSStyleDeclaration] as string ?? '';

        this.apply();
    }

    //######################### public methods #########################

    /**
     * Destroyes css update and removes changes applied to element
     */
    public destroy(): void
    {
        this.renderer.setStyle(this.element, `margin${this.marginSide}`, this.originalMargin);
    }

    //######################### protected methods #########################

    /**
     * Applies css changes to element
     */
    protected apply(): void
    {
        this.renderer.setStyle(this.element, `margin${this.marginSide}`, `calc(${this.requiredSpace}px + ${this.originalMargin || '0px'})`);
    }
}

/**
 * Service used for rendering placeholder
 */
@Injectable()
export class PlaceholderRenderer implements OnDestroy
{
    //######################### protected properties #########################

    /**
     * Instance of HTML element
     */
    protected placeholderElement: HTMLElement|undefined|null;

    /**
     * Instance of dnd bus service
     */
    protected dndBus: DndBusService = inject(DndBusService);

    /**
     * NgZone instance
     */
    protected ngZone: NgZone = inject(NgZone);

    /**
     * Instance of renderer used for DOM manipulation
     */
    protected renderer: Renderer2 = inject(Renderer2);

    /**
     * Instance of position plugin
     */
    protected position: Position<HTMLElement> = inject(POSITION) as Position<HTMLElement>;

    /**
     * Instance of html document
     */
    protected document: Document = inject(DOCUMENT);

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    /**
     * Subscription for placeholder connection to DOM
     */
    protected placeholderConnection: Subscription|undefined|null;

    /**
     * Css update applied to before element
     */
    protected cssUpdateBefore: CssStyleUpdates|undefined|null;

    /**
     * Css update applied to after element
     */
    protected cssUpdateAfter: CssStyleUpdates|undefined|null;

    /**
     * Safely gets placeholder element
     */
    protected get placeholderElementSafe(): HTMLElement
    {
        if(!this.placeholderElement)
        {
            throw new Error('PlaceholderRenderer: missing placeholder element');
        }

        return this.placeholderElement;
    }

    //######################### constructor #########################
    constructor()
    {
        this.initSubscriptions.add(this.dndBus.oldDropPlaceholderPreviewChange.subscribe(() => this.removePlaceholder()));
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();

        this.removePlaceholder();
    }

    //######################### public methods #########################

    /**
     * Renders placeholder
     * @param containerElement - Container element that will display new placeholder
     * @param index - Index at which should be placeholder displayed
     * @param placeholderDrop - Placeholder drop that should be connnected to placeholder element
     * @param horizontal - Indication whether is container element horizontaly displaying children
     */
    public async renderPlaceholder(containerElement: Element, index: number, placeholderDrop: DropTarget<LayoutDragItem, LayoutDropResult>, horizontal: boolean): Promise<void>
    {
        const computedStyles = getComputedStyle(containerElement);

        this.createPlaceholder(placeholderDrop, containerElement, horizontal, computedStyles);

        //empty container or first place in container
        if(!containerElement.children.length || index == 0)
        {
            const offset = horizontal ? (+computedStyles.paddingLeft.replace('px', '')) : (+computedStyles.paddingTop.replace('px', ''));
            const crossOffset = horizontal ? (+computedStyles.paddingTop.replace('px', '')) : (+computedStyles.paddingLeft.replace('px', ''));

            this.applyPosition(containerElement, -6 -offset, horizontal ? PositionPlacement.LeftStart : PositionPlacement.TopStart, crossOffset);

            const firstItem = containerElement.children.item(0) as HTMLElement|null;

            //empty container
            if(!firstItem)
            {
                return;
            }

            this.cssUpdateAfter = new CssStyleUpdates(firstItem, true, 6, this.renderer, horizontal);
        }
        //last place in container
        else if(!containerElement.children.item(index))
        {
            const offset = horizontal ? (+computedStyles.paddingRight.replace('px', '')) : (+computedStyles.paddingBottom.replace('px', ''));
            const crossOffset = horizontal ? (+computedStyles.paddingTop.replace('px', '')) : (+computedStyles.paddingLeft.replace('px', ''));

            this.applyPosition(containerElement, -6 -offset, horizontal ? PositionPlacement.RightStart : PositionPlacement.BottomStart, crossOffset);

            const lastItem = containerElement.children.item(index - 1) as HTMLElement;
            this.cssUpdateAfter = new CssStyleUpdates(lastItem, false, 6, this.renderer, horizontal);
        }
        //any other place in container
        else
        {
            const lastItem = containerElement.children.item(index) as HTMLElement;
            const beforeLastItem = containerElement.children.item(index - 1) as HTMLElement;

            const lastComputedStyles = getComputedStyle(lastItem);
            const margin = horizontal
                ? +lastComputedStyles.marginLeft.replace('px', '')
                : +lastComputedStyles.marginTop.replace('px', '');

            this.cssUpdateAfter = new CssStyleUpdates(beforeLastItem, false, 3, this.renderer, horizontal);
            this.cssUpdateBefore = new CssStyleUpdates(lastItem, true, 3, this.renderer, horizontal);
            this.applyPosition(lastItem, margin, horizontal ? PositionPlacement.LeftStart : PositionPlacement.TopStart, this.getCrossOffset(containerElement, lastItem, horizontal, computedStyles));
        }
    }

    //######################### protected methods #########################

    /**
     * Creates placeholder element and connects it to placeholder drop
     * @param placeholderDrop - Placeholder drop that should be connnected to placeholder element
     * @param containerElement - Container element that will display new placeholder
     * @param horizontal - Indication whether is container element horizontaly displaying children
     * @param computedStyles - Computed styles for container element
     */
    protected createPlaceholder(placeholderDrop: DropTarget<LayoutDragItem>, containerElement: Element, horizontal: boolean, computedStyles: CSSStyleDeclaration): void
    {
        this.placeholderElement = this.renderer.createElement('div');
        this.renderer.addClass(this.placeholderElement, 'layout-placeholder');

        const padding = horizontal
            ? +computedStyles.paddingLeft.replace('px', '') + +computedStyles.paddingRight.replace('px', '')
            : +computedStyles.paddingTop.replace('px', '') + +computedStyles.paddingBottom.replace('px', '');

        const rect = containerElement.getBoundingClientRect();
        this.renderer.setStyle(this.placeholderElementSafe, horizontal ? 'height' : 'width', `${horizontal ? rect.height - padding : rect.width - padding}px`);

        renderToBody(this.document, this.placeholderElementSafe, DYNAMIC_BODY_CONTAINER);

        this.ngZone.runOutsideAngular(() =>
        {
            this.placeholderConnection?.unsubscribe();

            if(this.placeholderElement)
            {
                this.placeholderConnection = placeholderDrop.connectDropTarget(this.placeholderElement);
            }
        });
    }

    /**
     * Removes placeholder and all changes
     */
    protected removePlaceholder(): void
    {
        this.placeholderElement?.remove();
        this.placeholderElement = null;

        this.placeholderConnection?.unsubscribe();
        this.placeholderConnection = null;

        this.cssUpdateBefore?.destroy();
        this.cssUpdateBefore = null;

        this.cssUpdateAfter?.destroy();
        this.cssUpdateAfter = null;
    }

    /**
     * Gets cross axis offset used for correct position of placeholder
     * @param containerElement - Container element inside which is placeholder placed
     * @param element - Element whose position is used for calculation of offset
     * @param horizontal - Indication whether place placeholder horizontally
     * @param computedStyles - Computed styles for container element
     */
    protected getCrossOffset(containerElement: Element, element: Element, horizontal: boolean, computedStyles: CSSStyleDeclaration): number
    {
        const containerRect = containerElement.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        return horizontal ? (containerRect.y - elementRect.y + +computedStyles.paddingTop.replace('px', '')) : (containerRect.x - elementRect.x + +computedStyles.paddingLeft.replace('px', ''));
    }

    /**
     * Applies position to placeholder
     * @param element - Element to be positioned
     * @param offset - Offset that will be applied
     * @param placement - Placement to be used
     * @param crossOffset - Cross axis offset
     */
    protected async applyPosition(element: Element, offset: number, placement: PositionPlacement, crossOffset?: number): Promise<void>
    {
        //original placeholder element when applying changes
        const placeholderElement = this.placeholderElement;

        const result = await lastValueFrom(this.position.placeElement(this.placeholderElementSafe, element, {placement, offset: {mainAxis: offset, crossAxis: crossOffset ?? 0}}));

        //element was already removed, or changed
        if(this.placeholderElement != placeholderElement || !result)
        {
            return;
        }

        applyPositionResult(result);
    }
}