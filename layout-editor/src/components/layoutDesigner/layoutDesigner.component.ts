import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, SkipSelf, Optional, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {Logger, LOGGER, PositionModule} from '@anglr/common';
import {LayoutComponent} from '@anglr/dynamic';
import {LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';

import {LayoutDesignerComponentOptions} from './layoutDesigner.options';
import {DesignerMinHeightSADirective} from '../../directives';

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
        DragDropModule,
        DesignerMinHeightSADirective,
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutDesignerSAComponent extends LayoutComponentBase<LayoutDesignerComponentOptions> implements LayoutComponent<LayoutDesignerComponentOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is overlay visible
     */
    protected overlayVisible: boolean = false;

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                protected _element: ElementRef<HTMLElement>,
                @Inject(LOGGER) @Optional() logger?: Logger,
                @SkipSelf() @Optional() protected _parent?: LayoutDesignerSAComponent,)
    {
        super(changeDetector, logger);
    }

    //######################### protected methods - host #########################

    /**
     * Shows designer overlay
     * @param event - Mouse event that occured
     */
    protected showOverlay(event: Event): void
    {
        this._logger?.verbose('LayoutDesignerComponent: Showing overlay for {@type}', {name: this._options?.typeMetadata.name, id: this._options?.typeMetadata.id});

        event.preventDefault();
        event.stopPropagation();

        this._parent?.hideOverlay(event);
        this.overlayVisible = true;
    }

    /**
     * Hides designer overlay
     * @param event - Mouse event that occured
     */
    protected hideOverlay(event: Event): void
    {
        this._logger?.verbose('LayoutDesignerComponent: Hiding overlay for {@type}', {name: this._options?.typeMetadata.name, id: this._options?.typeMetadata.id});

        event.preventDefault();
        event.stopPropagation();

        this.overlayVisible = false;
    }
}