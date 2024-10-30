import {ChangeDetectorRef, ComponentRef, Directive, effect, inject, OnDestroy, Signal, signal, WritableSignal} from '@angular/core';
import {LayoutComponent, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {BindThis, Invalidatable, isDescendant} from '@jscrpt/common';

import {LayoutDesignerOverlayDirective} from '../layoutDesignerOverlay/layoutDesignerOverlay.directive';
import {LayoutDesignerEditorMetadataDirective} from '../layoutDesignerEditorMetadata/layoutDesignerEditorMetadata.directive';
import {LayoutDesignerCommonDirective} from '../layoutDesignerCommon/layoutDesignerCommon.directive';
import {LayoutComponentsIteratorService, LayoutEditorMetadataManager} from '../../services';
import {LayoutComponentDragData} from '../../interfaces';
import type {DndCoreDesignerDirective} from '../../modules/layoutDndCore/directives/dndCoreDesigner/dndCoreDesigner.directive';

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
     * Instance of service used for iterating through children of component
     */
    protected iteratorSvc: LayoutComponentsIteratorService = inject(LayoutComponentsIteratorService);

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

    /**
     * Instance of designer dnd core directive
     */
    public dndCoreDesigner!: DndCoreDesignerDirective;

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
        this.layoutEditorManager.unregisterLayoutDesignerComponent(this.metadataSafe.id);
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
        this.layoutEditorManager.registerLayoutDesignerComponent(this, metadata.id, this.parent?.metadataSafe.id);
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

    /**
     * Adds descentant component metadata to this component metadata
     * @param dragData - Data from drag n drop event
     */
    public addDescendant(dragData: LayoutComponentDragData): void
    {
        console.log(dragData);
        // const options = this.optionsSafe;
        // let triggerLayoutChange = false;
        // const parentId = dragData.parentId;
        // this.logger.debug('LayoutDesignerSAComponent: Adding descendant {{@data}}', {data: {id: dragData.metadata?.id, parent: this.id}});

        // if(!dragData.metadata)
        // {
        //     this.logger.warn('LayoutDesignerSAComponent: Missing metadata while adding descendant');

        //     return;
        // }

        // //already added to tree, removing old reference
        // if(parentId)
        // {
        //     //only changing order in same parent
        //     if(parentId == this.id)
        //     {
        //         this.logger.verbose('LayoutDesignerSAComponent: Swapping child component {{@(4)data}}', {data: {id: this.id}});

        //         this.editorMetadata?.removeDescendant?.(dragData.metadata.id, options.typeMetadata.options);
        //         triggerLayoutChange = true;
        //     }
        //     else
        //     {
        //         this.history.disable();
        //         this.layoutEditorMetadataManager.getComponent(parentId)?.removeDescendant(dragData.metadata.id);
        //         this.history.enable();
        //     }
        // }

        // this.editorMetadata?.addDescendant?.(dragData?.metadata, options.typeMetadata.options, dragData.index ?? 0);
        // this.canDrop = this.editorMetadata?.canDropMetadata?.(options.typeMetadata.options) ?? false;

        // const changes: SimpleChanges = {};
        // addSimpleChange<LayoutComponent>(changes, 'options', options.typeMetadata.options, options.typeMetadata.options, false);
        // this.componentInstance.dynamicOnChanges?.(changes);
        // this.componentInstance.invalidateVisuals();

        // if(triggerLayoutChange)
        // {
        //     this.layoutEditorMetadataManager.updateLayout();
        // }

        // const layoutDesigners = this.layoutEditorMetadataManager.getChildren(this.id);
        
        // //update indexes of children
        // for(const designer of layoutDesigners)
        // {
        //     designer?.updateIndex();
        //     designer?.invalidateVisuals();
        // }

        // this.history.getNewState();
    }

    /**
     * Removes descendant metadata from this component metadata
     * @param id - Id of descendant to be removed
     */
    public removeDescendant(id: string): void
    {
        console.log(id);
        // const options = this.optionsSafe;

        // this.logger.debug('LayoutDesignerSAComponent: Removing descendant {{@(4)data}}', {data: {id: this.id, child: id}});

        // this.editorMetadata?.removeDescendant?.(id, options.typeMetadata.options);
        // this.canDrop = this.editorMetadata?.canDropMetadata?.(options.typeMetadata.options) ?? false;
        
        // const changes: SimpleChanges = {};
        // addSimpleChange<LayoutComponent>(changes, 'options', options.typeMetadata.options, options.typeMetadata.options, false);
        // this.componentInstance.dynamicOnChanges?.(changes);
        // this.componentInstance.invalidateVisuals();

        // const layoutDesigners = this.layoutEditorMetadataManager.getChildren(this.id);
        
        // //update indexes of children
        // for(const designer of layoutDesigners)
        // {
        //     designer?.updateIndex();
        //     designer?.invalidateVisuals();
        // }

        // this.history.getNewState();
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
     * Updates its own index in parent
     */
    protected async updateIndex(): Promise<void>
    {
        const metadata = this.metadataSafe;

        //obtains index of itself in parent
        if(this.parent?.metadataSafe)
        {
            for await(const child of this.iteratorSvc.getChildrenIteratorFor(this.parent.metadataSafe))
            {
                if(metadata.id === child.metadata.id)
                {
                    this.ɵindex = child.index;

                    break;
                }
            }
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