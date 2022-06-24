import {FormGroup} from '@angular/forms';
import {FormModelGroup} from '@anglr/common/forms';
import {DynamicItemSource} from '@anglr/dynamic';

/**
 * Defines control that will handle displaying of properties/options of component
 */
export interface PropertiesControl<TOptions = any>
{
    /**
     * Form group representing whole options
     */
    form: FormGroup<FormModelGroup<TOptions>>;

    /**
     * Defines dynamic item source which properties are edited
     */
    itemSource: DynamicItemSource;
}