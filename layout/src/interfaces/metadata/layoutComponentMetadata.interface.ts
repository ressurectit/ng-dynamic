import {DynamicItemSource} from '@anglr/dynamic';

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
     * Display name of component, this is how is component displayed
     */
    displayName?: string;

    /**
     * Options passed to component
     */
    options: TOptions|undefined|null;
}