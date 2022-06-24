import {DynamicItem} from '@anglr/dynamic';
import {Func, PromiseOr} from '@jscrpt/common';

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

    //######################### methods #########################

    /**
     * Initialize dynamic item with initial options
     * @param options - Initial options for initialization
     */
    initialize?: Func<PromiseOr<void>, [TOptions|undefined|null]>;
}