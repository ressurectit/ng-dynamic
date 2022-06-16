import {DynamicItemSource} from '../../dynamicItem';

/**
 * Metadata used for rendering layout component
 */
export interface LayoutComponentMetadata<TOptions = any> extends DynamicItemSource
{
    //######################### properties #########################
    
    /**
     * Unique id identifying component in current view
     */
    id: string;

    /**
     * Options passed to component
     */
    options: TOptions;
}