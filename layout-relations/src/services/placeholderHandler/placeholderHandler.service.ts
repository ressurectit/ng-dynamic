import {inject, Injector, Type} from '@angular/core';
import {LayoutComponentMetadata, LAYOUT_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout';

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
    protected designMode: boolean;

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

    protected get id(): string
    {
        return (this.ɵid ??= this.injector.get(this.componentWithIdType).id);
    }

    //######################### public properties #########################

    /**
     * Gets indication whether is this handler attached to custom component
     */
    public get isCustomComponent(): boolean
    {
        return !this.ɵisPlaceholder;
    }

    /**
     * Gets indication whether is this handler attached to placeholder
     */
    public get isPlaceholder(): boolean
    {
        return this.ɵisPlaceholder;
    }

    /**
     * Gets instance of parent placeholder handler
     */
    public get parent(): PlaceholderHandler<TOptions>|undefined|null
    {
        return this.ɵparent;
    }

    public parentCustomComponentDesignMode: boolean = false;

    public parentPlaceholderDesignMode: boolean = false;

    public ancestorCustomComponentDesignMode: boolean = false;

    public ancestorPlaceholderDesignMode: boolean = false;

    /**
     * Gets indication whether display placeholder container or just placeholder
     */
    public get placeholderContainer(): boolean
    {
        return false;
    }

    //######################### constructor #########################
    constructor(protected componentWithIdType: Type<ComponentWithId>,
                protected customComponent?: CustomComponentSAComponent,)
    {
        this.ɵisPlaceholder = !this.customComponent;
        this.designMode = this.ɵisPlaceholder ? true : !!this.injector.get(Injector, null, {skipSelf: true,})?.get(LAYOUT_COMPONENT_TRANSFORM, null, {optional: true});

        console.log(this.isPlaceholder ? 'placeholder': 'custom', this.parent);
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

    public setOptions(options: any): void
    {
    }
}