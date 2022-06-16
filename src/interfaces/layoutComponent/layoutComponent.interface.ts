import {DynamicItem} from '../dynamicItem';

/**
 * Description of layout component
 */
export interface LayoutComponent<TOptions = any> extends DynamicItem
{
    //######################### properties #########################

    /**
     * Options used for rendering this component
     */
    options: TOptions;
}