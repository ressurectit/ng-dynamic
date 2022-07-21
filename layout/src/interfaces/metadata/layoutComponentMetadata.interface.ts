import {DynamicItemMetadata} from '@anglr/dynamic';

/**
 * Metadata used for rendering layout component
 */
export interface LayoutComponentMetadata<TOptions = any> extends DynamicItemMetadata
{
    //######################### properties #########################
    
    /**
     * Options passed to component
     */
    options: TOptions|undefined|null;
}