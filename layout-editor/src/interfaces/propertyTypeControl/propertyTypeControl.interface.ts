import {FormControl} from '@angular/forms';

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
}