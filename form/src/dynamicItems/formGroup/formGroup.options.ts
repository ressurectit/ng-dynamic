import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {FormComponentOptions} from '../../misc/formComponentBase.options';

/**
 * Options for form group component
 */
export interface FormGroupComponentOptions extends FormComponentOptions
{
    /**
     * Array of children that are going to be rendered
     */
    children: LayoutComponentMetadata[]|undefined|null;
}