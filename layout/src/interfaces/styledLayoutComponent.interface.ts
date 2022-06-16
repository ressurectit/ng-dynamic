import {LayoutComponent} from '@anglr/dynamic';

import {ComponentStylingOptions} from '../directives';

/**
 * Description of layout component with styling support
 */
export interface StyledLayoutComponent<TOptions = any> extends LayoutComponent<TOptions&ComponentStylingOptions>
{
}