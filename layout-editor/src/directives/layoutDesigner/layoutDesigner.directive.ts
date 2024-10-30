import {ChangeDetectorRef, ComponentRef, Directive, effect, inject, OnDestroy, Signal, signal, WritableSignal} from '@angular/core';
import {LayoutComponent, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {BindThis, Invalidatable, isDescendant} from '@jscrpt/common';

import {LayoutDesignerOverlayDirective} from '../layoutDesignerOverlay/layoutDesignerOverlay.directive';
import {LayoutDesignerEditorMetadataDirective} from '../layoutDesignerEditorMetadata/layoutDesignerEditorMetadata.directive';
import {LayoutDesignerCommonDirective} from '../layoutDesignerCommon/layoutDesignerCommon.directive';
import {LayoutEditorMetadataManager} from '../../services';

/**
 * Directive that is used for rendering all needed for layout designer
 */
@Directive(
{
    selector: '[layoutDesigner]',
    standalone: true,
    hostDirectives:
    [
        LayoutDesignerEditorMetadataDirective,
        LayoutDesignerOverlayDirective,
        LayoutDesignerCommonDirective,
    ],
})
export class LayoutDesignerDirective<TOptions = unknown> implements OnDestroy, Invalidatable
{
    //######################### protected fields #########################

    /**
     * Instance of change detector for component
     */
    protected changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
     * Instance of layout designer directive
     */
    protected overlay: LayoutDesignerOverlayDirective = inject(LayoutDesignerOverlayDirective);

    /**
     * Instance of editor medata directive
     */
    protected ɵeditorMetadata: LayoutDesignerEditorMetadataDirective = inject(LayoutDesignerEditorMetadataDirective);

    /**
     * Instance of common designer directive storing common stuff
     */
    protected common: LayoutDesignerCommonDirective = inject(LayoutDesignerCommonDirective);

    /**
     * Instance of parent layout designer
     */
    protected parent: LayoutDesignerDirective|undefined|null = inject(LayoutDesignerDirective, {optional: true, skipSelf: true,});

    /**
     * Instance of layout editor manager
     */
    protected layoutEditorManager: LayoutEditorMetadataManager = inject(LayoutEditorMetadataManager);

    /**
     * Component reference for which is this designer
     */
    protected component: ComponentRef<LayoutComponent>|undefined|null;

    /**
     * Metadata of rendered component
     */
    protected metadata: LayoutComponentMetadata<TOptions>|undefined|null;

    /**
     * Indication whether is overlay visible
     */
    protected overlayVisible: boolean = false;

    /**
     * Index of current layout designer in its parent
     */
    protected ɵindex: number = 0;

    /**
     * Display name signal wrapper for passing changes into editor
     */
    protected displayNameSignal: WritableSignal<string> = signal('');

    //######################### public properties #########################

    /**
     * Gets display name signal wrapper for passing changes into editor
     */
    public get displayName(): Signal<string>
    {
        return this.displayNameSignal.asReadonly();
    }

    /**
     * Gets indication whether drag is disabled for component
     */
    public get dragDisabled(): boolean
    {
        return !this.parent || !!this.editorMetadata.metadata?.metaInfo?.dragDisabled;
    }

    /**
     * Gets index of current layout designer in its parent
     */
    public get index(): number
    {
        return this.ɵindex;
    }

    /**
     * Gets instance of editor medata directive
     */
    public get editorMetadata(): LayoutDesignerEditorMetadataDirective
    {
        return this.ɵeditorMetadata;
    }

    /**
     * Gets safely component reference for which is this designer
     */
    public get componentSafe(): ComponentRef<LayoutComponent>
    {
        if(!this.component)
        {
            throw new Error('LayoutDesignerDirective: missing component reference!');
        }

        return this.component;
    }

    /**
     * Gets safely metadata of rendered component
     */
    public get metadataSafe(): LayoutComponentMetadata<TOptions>
    {
        if(!this.metadata)
        {
            throw new Error('LayoutDesignerDirective: missing component metadata!');
        }

        return this.metadata;
    }

    //######################### constructor #########################
    constructor()
    {
        effect(() =>
        {
            if(!this.overlay.preventOverlayHide())
            {
                this.hideDesignerOverlay();
            }
        });
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        this.common.element.nativeElement.removeEventListener('mouseover', this.showDesignerOverlay);
        this.common.element.nativeElement.removeEventListener('mouseleave', this.hideDesignerOverlay);
    }

    //######################### public methods - implementation of Invalidatable #########################

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this.changeDetector.detectChanges();
    }

    //######################### public methods #########################

    /**
     * Initialize designer for rendered component
     * @param component - Component reference for which is this designer initialized
     * @param metadata - Metadata of rendered component
     */
    public async initializeDesigner(component: ComponentRef<LayoutComponent>, metadata: LayoutComponentMetadata): Promise<void>
    {
        this.component = component;
        this.metadata = metadata;
        this.displayNameSignal.set(metadata.displayName ?? metadata.id);

        this.common.element.nativeElement.addEventListener('mouseover', this.showDesignerOverlay);
        this.common.element.nativeElement.addEventListener('mouseleave', this.hideDesignerOverlay);

        await this.editorMetadata.initialize(metadata);
    }

    /**
     * Updates display name of component
     * @param displayName - New display name to beset
     */
    public updateDisplayName(displayName: string): void
    {
        this.metadataSafe.displayName = displayName;
        this.displayNameSignal.set(displayName);
    }

    //######################### protected methods #########################

    /**
     * Shows designer overlay on 'hover'
     * @param event - Event that occured
     */
    @BindThis
    protected showDesignerOverlay(event: MouseEvent): void
    {
        event.stopPropagation();

        if(this.overlayVisible)
        {
            return;
        }

        this.overlayVisible = true;

        this.hideParentOverlay();
        this.overlay.showOverlay(this.metadataSafe.displayName || this.metadataSafe.id);
    }

    /**
     * Hides desiner overlay on 'blur'
     * @param event - Event that occured
     */
    @BindThis
    protected hideDesignerOverlay(event?: MouseEvent|undefined|null): void
    {
        const hideDesignerOverlayFn = () =>
        {
            if(this.overlay.preventOverlayHide())
            {
                return;
            }

            if(event)
            {
                event.stopPropagation();

                if(!event.target)
                {
                    throw new Error('LayoutDesignerDirective: missing event target!');
                }

                if(!this.overlayVisible || isDescendant(this.common.element.nativeElement, event.target as HTMLElement))
                {
                    return;
                }
            }

            this.overlayVisible = false;

            this.overlay.hideOverlay();
        };

        if(event)
        {
            setTimeout(hideDesignerOverlayFn, 1);
        }
        else
        {
            hideDesignerOverlayFn();
        }
    }

    /**
     * Hides all parents overlays
     */
    protected hideParentOverlay(): void
    {
        if(this.parent)
        {
            this.parent.hideParentOverlay();

            if(this.parent.overlayVisible)
            {
                this.parent.hideDesignerOverlay();
            }
        }
    }
}