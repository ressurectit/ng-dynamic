import {inject, Injector, Type} from '@angular/core';
import {LayoutComponentMetadata, LayoutComponentTransform, LAYOUT_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout';
import {RelationsChangeDetector, RelationsComponentManager, RelationsDebugger, RelationsManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {LOGGER, Logger} from '@anglr/common';

import type {CustomComponentSAComponent} from '../../dynamicItems/customComponent/customComponent.component';
import {ComponentWithId} from '../../interfaces';

/**
 * Service that handles storing, obtaining of placeholder configuration, also correct rendering of placeholder or placeholder container
 */
export class PlaceholderHandler<TOptions = unknown>
{
    //######################### protected properties #########################

    /**
     * Indication whether is this handler attached to placeholder or custom component
     */
    protected ɵisPlaceholder: boolean;

    /**
     * Indication whether is attached component in design mode
     */
    protected ɵdesignMode: boolean|undefined|null;

    /**
     * Id of attached component
     */
    protected ɵid: string|undefined|null;

    /**
     * Instance of parent placeholder handler
     */
    protected ɵparent: PlaceholderHandler<TOptions>|undefined|null = inject(PlaceholderHandler, {optional: true, skipSelf: true,});

    /**
     * Injector that is assigned with placeholder handler
     */
    protected injector: Injector = inject(Injector);

    /**
     * Instance of logger used for logging
     */
    protected logger: Logger = inject(LOGGER);

    /**
     * Gets id of attached component
     */
    protected get id(): string
    {
        return (this.ɵid ??= this.injector.get(this.componentWithIdType).id);
    }

    /**
     * Gets indication whether is this handler attached to custom component
     */
    protected get isCustomComponent(): boolean
    {
        return !this.ɵisPlaceholder;
    }

    /**
     * Gets indication whether is this handler attached to placeholder
     */
    protected get isPlaceholder(): boolean
    {
        return this.ɵisPlaceholder;
    }

    /**
     * Gets nearest handler for custom component
     */
    protected get nearestCustomComponent(): PlaceholderHandler|undefined|null
    {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let handler: PlaceholderHandler|undefined|null = this;

        do
        {
            if(handler.isCustomComponent)
            {
                return handler;
            }
        }
        while((handler = handler.parent));

        return null;
    }

    /**
     * Gets nearest handler for custom component that is in design mode
     */
    protected get nearestDesignCustomComponent(): PlaceholderHandler|undefined|null
    {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let handler: PlaceholderHandler|undefined|null = this;

        do
        {
            if(handler.isCustomComponent && handler.designMode)
            {
                return handler;
            }
        }
        while((handler = handler.parent));

        return null;
    }

    //######################### public properties #########################

    /**
     * Gets instance of parent placeholder handler
     */
    public get parent(): PlaceholderHandler<TOptions>|undefined|null
    {
        return this.ɵparent;
    }

    /**
     * Gets indication whether is attached component in design mode
     */
    public get designMode(): boolean
    {
        return (this.ɵdesignMode ??= this.ɵisPlaceholder ? 
            !!this.injector.get(LAYOUT_COMPONENT_TRANSFORM, null, {optional: true}) :
            !!this.injector.get(LAYOUT_COMPONENT_TRANSFORM, null, {skipSelf: true, optional: true,}));
    }

    /**
     * Gets indication whether display placeholder container or just placeholder
     */
    public get placeholderContainer(): boolean
    {
        return !(!this.parent || (this.parent.isPlaceholder && this.parent.designMode));
    }

    /**
     * Gets layout designer component transform function
     */
    public get layoutDesignerComponentTransform(): LayoutComponentTransform|null
    {
        //current transform
        const transform = this.injector.get(LAYOUT_COMPONENT_TRANSFORM, null, {skipSelf: true, optional: true});

        //current or parent custom component transform
        const result = transform ??
            this.findRelatedCustomComponentHandler()?.injector?.get(LAYOUT_COMPONENT_TRANSFORM, null, {skipSelf: true, optional: true}) ??
            null;

        return result;
    }

    /**
     * Relations component manager instance that is used for placeholders
     */
    public get relationsComponentManager(): RelationsComponentManager|null
    {
        return this.getParentCustomComponentHandler()?.injector.get(RelationsComponentManager, undefined, {skipSelf: true}) ?? null;
    }

    /**
     * Relations processor instance that is used for placeholders
     */
    public get relationsProcessor(): RelationsProcessor|null
    {
        return this.getParentCustomComponentHandler()?.injector.get(RelationsProcessor, undefined, {skipSelf: true}) ?? null;
    }

    /**
     * Relations change detector instance that is used for placeholders
     */
    public get relationsChangeDetector(): RelationsChangeDetector|null
    {
        return this.getParentCustomComponentHandler()?.injector.get(RelationsChangeDetector, undefined, {skipSelf: true}) ?? null;
    }

    /**
     * Relations debugger instance that is used for placeholders
     */
    public get relationsDebugger(): RelationsDebugger|null
    {
        return this.getParentCustomComponentHandler()?.injector.get(RelationsDebugger, undefined, {skipSelf: true}) ?? null;
    }

    /**
     * Relations manager instance that is used for placeholders
     */
    public get relationsManager(): RelationsManager|null
    {
        return this.getParentCustomComponentHandler()?.injector.get(RelationsManager, undefined, {skipSelf: true}) ?? null;
    }

    //######################### constructor #########################
    constructor(protected componentWithIdType: Type<ComponentWithId>,
                protected customComponent?: CustomComponentSAComponent,)
    {
        this.ɵisPlaceholder = !this.customComponent;
    }

    //######################### public methods #########################

    /**
     * Gets options for placeholder using its id
     * @param id - Id of placeholder for which are options obtained
     */
    public getOptions(id: string): LayoutComponentMetadata<TOptions>|undefined|null
    {
        //is placeholder
        if(this.isPlaceholder)
        {
            if(!this.parent)
            {
                return null;
            }

            return this.parent.getOptions(id);
        }

        if(this.isCustomComponent && this.customComponent?.options?.placeholderContainers?.[id])
        {
            return this.customComponent.options.placeholderContainers[id];
        }

        if(!this.parent)
        {
            return null;
        }

        return this.parent.getOptions(id);
    }

    /**
     * Initialize options for placeholder container
     */
    public initOptions(): void
    {
        const custom = this.nearestDesignCustomComponent;

        if(!custom?.designMode || !custom.customComponent)
        {
            this.logger.error('PlaceholderHandler: closes parent custom component should be in editation mode!');

            return;
        }

        if(!custom.customComponent.options)
        {
            this.logger.error('PlaceholderHandler: missing custom component options!');

            return;
        }

        //if options does not exists create new one
        if(!custom.customComponent.options.placeholderContainers?.[this.id])
        {
            const containerId = `placeholderContainer-${custom.id}-${this.id}`;

            custom.customComponent.options.placeholderContainers ??= {};
            custom.customComponent.options.placeholderContainers[this.id] =
            {
                id: containerId,
                name: 'placeholderContainer',
                package: 'custom-components',
                displayName: containerId,
                options: {},
            };
        }
    }

    //######################### protected methods #########################

    /**
     * Finds if there is any related handler with attached custom component
     */
    protected findRelatedCustomComponentHandler(): PlaceholderHandler|undefined|null
    {
        let placeholders = 0;
        let customComponents = 0;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let handler: PlaceholderHandler = this;

        if(!handler.parent)
        {
            return null;
        }

        do
        {
            if(handler.parent.isCustomComponent && handler.parent.designMode)
            {
                if(placeholders == customComponents)
                {
                    return handler.parent;
                }

                return null;
            }

            if(handler.parent.isCustomComponent)
            {
                customComponents++;
            }
            else
            {
                placeholders++;
            }
        }
        while((handler = handler.parent));

        return null;
    }

    /**
     * Gets handler, which is attached to custom component which owns this placeholder container
     */
    protected getParentCustomComponentHandler(): PlaceholderHandler<TOptions>|null
    {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let handler: PlaceholderHandler<TOptions> = this;

        if(!handler.parent)
        {
            throw new Error('PlaceholderHandler: parent must be present to work with relations!');
        }

        do
        {
            //skip placeholder
            if(handler.isPlaceholder)
            {
                continue;
            }

            if(handler.customComponent?.options?.placeholderContainers?.[this.id])
            {
                return handler;
            }
        }
        while((handler = handler.parent));

        this.logger.error('PlaceholderHandler: unable to find owning custom component for {{@id}}', {id: this.id});

        return null;
    }
}