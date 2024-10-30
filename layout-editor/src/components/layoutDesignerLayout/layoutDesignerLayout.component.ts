import {Component, ChangeDetectionStrategy, ElementRef, OnDestroy, ChangeDetectorRef, effect} from '@angular/core';

import {LiveEventService} from '../../services';
import {LayoutDesignerCommonDirective} from '../../directives/layoutDesignerCommon/layoutDesignerCommon.directive';

/**
 * Component displaying layout designer layout overlay
 */
@Component(
{
    selector: 'div.designer-overlay-layout',
    templateUrl: 'layoutDesignerLayout.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerLayoutComponent implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Instance of mutation observer
     */
    protected observer: MutationObserver|undefined|null;

    //######################### constructor #########################
    constructor(protected element: ElementRef<HTMLElement>,
                protected common: LayoutDesignerCommonDirective,
                protected changeDetector: ChangeDetectorRef,
                protected liveEvents: LiveEventService,)
    {
        effect(() => this.toggleLiveEvents());

        this.observer = new MutationObserver(() => this.changeDetector.detectChanges());
        this.observer.observe(this.common.element.nativeElement, {attributeFilter: ['style']});
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.observer?.disconnect();
    }

    //######################### protected methods #########################

    /**
     * Toggles live events for element
     */
    protected toggleLiveEvents(): void
    {
        //TODO: move into designer
        // if(this.liveEvents.enabled())
        // {
        //     this.element.nativeElement.style.pointerEvents = 'none';
        // }
        // else
        // {
        //     this.element.nativeElement.style.pointerEvents = 'all';
        // }
    }
}