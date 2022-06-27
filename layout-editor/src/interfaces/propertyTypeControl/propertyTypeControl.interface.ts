import {FormControl} from '@angular/forms';
import {PromiseOr} from '@jscrpt/common';

import {LayoutEditorPropertyMetadata} from '../../misc/types';

/**
 * Defines control for specific property type
 */
export interface PropertyTypeControl<TValue = any, TValues = unknown>
{
    //######################### properties #########################

    /**
     * Form control that will handle value of property
     */
    control: FormControl<TValue>|undefined;

    /**
     * Metadata for displaying property control
     */
    metadata: LayoutEditorPropertyMetadata<TValues>|undefined;

    /**
     * Name of options/property, fallback if missing metadata
     */
    name: string|undefined;

    /**
     * Initialize component
     */
    initialize(): PromiseOr<void>;

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}