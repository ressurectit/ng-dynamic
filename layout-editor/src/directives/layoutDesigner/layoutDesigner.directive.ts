import {ChangeDetectorRef, ComponentRef, computed, Directive, effect, inject, OnDestroy, Signal, signal, SimpleChanges, WritableSignal} from '@angular/core';
import {LayoutComponent, LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {addSimpleChange, MetadataHistoryManager} from '@anglr/dynamic';
import {BindThis, Invalidatable, isDescendant} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import type {DndCoreDesignerDirective} from '../../modules/layoutDndCore/directives/dndCoreDesigner/dndCoreDesigner.directive';
import {LayoutDesignerOverlayDirective} from '../layoutDesignerOverlay/layoutDesignerOverlay.directive';
import {LayoutDesignerEditorMetadataDirective} from '../layoutDesignerEditorMetadata/layoutDesignerEditorMetadata.directive';
import {LayoutDesignerCommonDirective} from '../layoutDesignerCommon/layoutDesignerCommon.directive';
import {LayoutDesignerDnDDirective} from '../layoutDesignerDnD/layoutDesignerDnD.directive';
import {LayoutComponentsIteratorService, LayoutEditorMetadataManager, LiveEventService} from '../../services';
import {LayoutComponentDragData} from '../../interfaces';
import {LAYOUT_HISTORY_MANAGER} from '../../misc/tokens';

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
        LayoutDesignerDnDDirective,
    ],
})
export class LayoutDesignerDirective<TOptions = unknown> implements OnDestroy, Invalidatable
{
    //######################### protected fields #########################

    /**
     * Subscription for remove event
     */
    protected removeSubscription: Subscription|undefined|null;

    /**
     * Indication whether is current component selected
     */
    protected selected: Signal<boolean>;

    /**
     * Indication whether is current component highlighted
     */
    protected highlighted: Signal<boolean>;

    /**
     * Indication whether is overlay visible for this component
     */
    protected overlayVisible: Signal<boolean>;

    /**
     * Instance of layout metadata history manager
     */
    protected history: MetadataHistoryManager<LayoutComponentMetadata> = inject(LAYOUT_HISTORY_MANAGER);

    /**
     * Instance of live events service
     */
    protected liveEvents: LiveEventService = inject(LiveEventService);

    /**
     * Instance of change detector for component
     */
    protected changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
     * Instance of layout designer directive
     */
    protected overlay: LayoutDesignerOverlayDirective = inject(LayoutDesignerOverlayDirective);

    /**
     * Instance of common designer directive storing common stuff
     */
    protected common: LayoutDesignerCommonDirective = inject(LayoutDesignerCommonDirective);

    /**
     * Instance of parent layout designer
     */
    protected ɵparent: LayoutDesignerDirective|undefined|null = inject(LayoutDesignerDirective, {optional: true, skipSelf: true,});

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
     * Index of current layout designer in its parent
     */
    protected ɵindex: number = 0;

    /**
     * Display name signal wrapper for passing changes into editor
     */
    protected displayNameSignal: WritableSignal<string> = signal('');

    //######################### public properties #########################

    /**
     * Gets instance of parent layout designer
     */
    public get parent(): LayoutDesignerDirective|undefined|null
    {
        return this.ɵparent;
    }

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
        return !this.ɵparent || !!this.editorMetadata.metadata?.metaInfo?.dragDisabled;
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
        return this.common.editorMetadata;
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
        this.selected = computed(() => this.layoutEditorManager.selectedComponent() === this.metadata?.id);
        this.highlighted = computed(() => this.layoutEditorManager.highlightedComponent() === this.metadata?.id);
        this.overlayVisible = computed(() => this.selected() || this.highlighted());

        effect(() =>
        {
            if(this.overlayVisible())
            {
                this.showOverlay();
            }
            else
            {
                this.hideOverlay();
            }
        });

        effect(() =>
        {
            const liveEventsEnabled = this.liveEvents.enabled();

            if(!liveEventsEnabled)
            {
                this.common.element.nativeElement.classList.add('designer-live-events-off');
            }
            else
            {
                this.common.element.nativeElement.classList.remove('designer-live-events-off');
            }
        });

        this.removeSubscription = this.overlay.remove.subscribe(() => this.ɵparent?.removeDescendant(this.metadataSafe.id));
        this.common.element.nativeElement.classList.add('designer-element');
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        this.common.element.nativeElement.classList.remove('designer-element');
        this.common.element.nativeElement.removeEventListener('mouseover', this.highlightComponent);
        this.common.element.nativeElement.removeEventListener('mouseleave', this.cancelHighlightComponent);
        this.common.element.nativeElement.removeEventListener('click', this.selectComponent);
        this.common.element.nativeElement.removeEventListener('dblclick', this.deselectComponent);
        this.layoutEditorManager.unregisterLayoutDesignerComponent(this.metadataSafe.id);
        this.removeSubscription?.unsubscribe();
        this.removeSubscription = null;
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

        this.common.element.nativeElement.addEventListener('mouseover', this.highlightComponent);
        this.common.element.nativeElement.addEventListener('mouseleave', this.cancelHighlightComponent);
        this.common.element.nativeElement.addEventListener('click', this.selectComponent);
        this.common.element.nativeElement.addEventListener('dblclick', this.deselectComponent);

        await this.updateIndex();
        await this.editorMetadata.initialize(metadata);
        this.layoutEditorManager.registerLayoutDesignerComponent(this, metadata.id, this.ɵparent?.metadataSafe.id);
    }

    /**
     * Updates display name of component
     * @param displayName - New display name to beset
     */
    public updateDisplayName(displayName: string): void
    {
        this.metadataSafe.displayName = displayName;
        this.displayNameSignal.set(displayName);
        this.overlay.updateTitle(displayName || this.metadataSafe.id);
    }

    /**
     * Adds descentant component metadata to this component metadata
     * @param dragData - Data from drag n drop event
     */
    public addDescendant(dragData: LayoutComponentDragData): void
    {
        const metadata = this.metadataSafe;
        let triggerLayoutChange = false;
        const parentId = dragData.parentId;

        this.common.logger.debug('LayoutDesignerDirective: Adding descendant {{@data}}', {data: {id: dragData.metadata?.id, parent: metadata.id}});

        if(!dragData.metadata)
        {
            this.common.logger.warn('LayoutDesignerDirective: Missing metadata while adding descendant');

            return;
        }

        //already added to tree, removing old reference
        if(parentId)
        {
            //only changing order in same parent
            if(parentId == metadata.id)
            {
                this.common.logger.verbose('LayoutDesignerDirective: Swapping child component {{@(4)data}}', {data: {id: metadata.id}});

                this.editorMetadata.metadata?.removeDescendant?.(dragData.metadata.id, metadata.options);
                triggerLayoutChange = true;
            }
            else
            {
                this.history.disable();
                this.layoutEditorManager.getComponent(parentId)?.removeDescendant(dragData.metadata.id);
                this.history.enable();
            }
        }

        this.editorMetadata.metadata?.addDescendant?.(dragData?.metadata, metadata.options, dragData.index ?? 0);
        this.editorMetadata.updateCanDrop();

        const changes: SimpleChanges = {};
        addSimpleChange<LayoutComponent>(changes, 'options', metadata.options, metadata.options, false);
        this.componentSafe.instance.dynamicOnChanges?.(changes);
        this.componentSafe.instance.invalidateVisuals();

        if(triggerLayoutChange)
        {
            this.layoutEditorManager.updateLayout();
        }

        const layoutDesigners = this.layoutEditorManager.getChildren(metadata.id);
        
        //update indexes of children
        for(const designer of layoutDesigners)
        {
            designer?.updateIndex();
            designer?.invalidateVisuals();
        }

        this.history.getNewState();
    }

    /**
     * Removes descendant metadata from this component metadata
     * @param id - Id of descendant to be removed
     */
    public removeDescendant(id: string): void
    {
        const metadata = this.metadataSafe;

        this.common.logger.debug('LayoutDesignerDirective: Removing descendant {{@(4)data}}', {data: {id: metadata.id, child: id}});

        this.editorMetadata.metadata?.removeDescendant?.(id, metadata.options);
        this.editorMetadata.updateCanDrop();
        
        const changes: SimpleChanges = {};
        addSimpleChange<LayoutComponent>(changes, 'options', metadata.options, metadata.options, false);
        this.componentSafe.instance.dynamicOnChanges?.(changes);
        this.componentSafe.instance.invalidateVisuals();

        const layoutDesigners = this.layoutEditorManager.getChildren(metadata.id);
        
        //update indexes of children
        for(const designer of layoutDesigners)
        {
            designer?.updateIndex();
            designer?.invalidateVisuals();
        }

        this.history.getNewState();
    }

    //######################### protected methods #########################

    /**
     * Marks component as selected on 'click'
     * @param event - Event that occured
     */
    @BindThis
    protected selectComponent(event: MouseEvent): void
    {
        event.stopPropagation();

        this.layoutEditorManager.selectComponent(this.metadataSafe.id);
    }

    /**
     * Deselects component on 'double click'
     * @param event - Event that occured
     */
    @BindThis
    protected deselectComponent(event: MouseEvent): void
    {
        event.stopPropagation();

        this.layoutEditorManager.unselectComponent();
    }

    /**
     * Marks component as highlighted on 'hover'
     * @param event - Event that occured
     */
    @BindThis
    protected highlightComponent(event: MouseEvent): void
    {
        event.stopPropagation();

        this.layoutEditorManager.highlightComponent(this.metadataSafe.id);
    }

    /**
     * Cancel highlight on component on 'blur'
     * @param event - Event that occured
     */
    @BindThis
    protected cancelHighlightComponent(event: MouseEvent): void
    {
        event.stopPropagation();

        if(!event.target)
        {
            throw new Error('LayoutDesignerDirective: missing event target!');
        }

        if(isDescendant(this.common.element.nativeElement, event.target as HTMLElement))
        {
            return;
        }

        this.layoutEditorManager.cancelHighlightedComponent();
    }

    /**
     * Shows overlay over component
     */
    protected showOverlay(): void
    {
        this.overlay.showOverlay(this.metadataSafe.displayName || this.metadataSafe.id);
    }

    /**
     * Hides overlay over component
     */
    protected hideOverlay(): void
    {
        this.overlay.hideOverlay();
    }

    /**
     * Updates its own index in parent
     */
    protected async updateIndex(): Promise<void>
    {
        const metadata = this.metadataSafe;

        //obtains index of itself in parent
        if(this.ɵparent?.metadataSafe)
        {
            for await(const child of this.iteratorSvc.getChildrenIteratorFor(this.ɵparent.metadataSafe))
            {
                if(metadata.id === child.metadata.id)
                {
                    this.ɵindex = child.index;

                    break;
                }
            }
        }
    }
}