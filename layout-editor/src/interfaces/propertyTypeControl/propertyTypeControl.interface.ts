import {FormControl} from '@angular/forms';
import {PromiseOr} from '@jscrpt/common';

/**
 * Defines control for specific property type
 */
export interface PropertyTypeControl<TValue = any>
{
    //######################### properties #########################

    /**
     * Form control that will handle value of property
     */
    control: FormControl<TValue|null>|undefined;

    /**
     * Array of available values/options for selection
     */
    values: TValue[];

    /**
     * Initialize component
     */
    initialize(): PromiseOr<void>;

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}