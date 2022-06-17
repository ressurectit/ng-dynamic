import {Component, ChangeDetectionStrategy, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PositionModule} from '@anglr/common';
import {LayoutComponent} from '@anglr/dynamic';
import {LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';

import {LayoutDesignerComponentOptions} from './layoutDesigner.options';

/**
 * Component used as designer component wrapper for layout component
 */
@Component(
{
    selector: 'layout-designer-component',
    templateUrl: 'layoutDesigner.component.html',
    styleUrls: ['layoutDesigner.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
        PositionModule,
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerComponent extends LayoutComponentBase<LayoutDesignerComponentOptions> implements LayoutComponent<LayoutDesignerComponentOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is overlay visible
     */
    protected overlayVisible: boolean = false;

    //######################### protected methods - host #########################

    /**
     * Shows designer overlay
     * @param event - Mouse event that occured
     */
    @HostListener('mouseover', ['$event'])
    protected _showOverlay(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        this.overlayVisible = true;
    }

    /**
     * Hides designer overlay
     * @param event - Mouse event that occured
     */
    @HostListener('mouseout', ['$event'])
    protected _hideOverlay(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        this.overlayVisible = false;
    }
}