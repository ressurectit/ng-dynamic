import {ElementRef, Injector} from '@angular/core';

import {DynamicItem} from '../dynamicItem/dynamicItem.interface';

/**
 * Definition of dynamic item extension
 */
export interface DynamicItemExtension<TMetadata = any> extends DynamicItem
{
    //######################### public methods #########################

    /**
     * Initialize dynamic item extension
     * @param injector - Injector from extended component
     * @param element - Element that is being extended
     * @param metadata - Metadata of extended component
     */
    initialize(injector: Injector, element: ElementRef<HTMLElement>, metadata: TMetadata): void;

    /**
     * Notifies dynamic item extension that metadata has changed
     * @param metadata - Metadata that has changed
     */
    metadataChange(metadata: TMetadata): void;

    /**
     * Destroys dynamic item extensions
     */
    destroy(): void;
}