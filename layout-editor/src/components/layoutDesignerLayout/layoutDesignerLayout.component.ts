import {Component, ChangeDetectionStrategy, ElementRef, OnDestroy, ChangeDetectorRef} from '@angular/core';

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
                protected changeDetector: ChangeDetectorRef,)
    {
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
        this.observer = null;
    }
}