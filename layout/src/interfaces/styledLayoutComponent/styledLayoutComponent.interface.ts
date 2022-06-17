import {ComponentStylingOptions} from '../../directives';
import {LayoutComponent} from '../layoutComponent/layoutComponent.interface';

/**
 * Description of layout component with styling support
 */
export interface StyledLayoutComponent<TOptions = any> extends LayoutComponent<TOptions&ComponentStylingOptions>
{
}