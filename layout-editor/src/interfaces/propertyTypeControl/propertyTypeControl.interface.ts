import {OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {LayoutEditorPropertyMetadata} from '../../misc/types';

/**
 * Defines control for specific property type
 */
export interface PropertyTypeControl<TValue = any, TValues = unknown> extends OnInit
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
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}