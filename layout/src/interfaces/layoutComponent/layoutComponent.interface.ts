import {DynamicItem} from '@anglr/dynamic';

/**
 * Description of layout component
 */
export interface LayoutComponent<TOptions = any> extends DynamicItem
{
    //######################### properties #########################

    /**
     * Options used for rendering this component
     */
    options: TOptions|undefined|null;
}