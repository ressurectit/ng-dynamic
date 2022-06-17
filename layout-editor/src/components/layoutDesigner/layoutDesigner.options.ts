import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

/**
 * Options for LayoutDesignerComponent component
 */
export interface LayoutDesignerComponentOptions<TTypeOptions = any>
{
    //######################### properties #########################
    
    /**
     * Metadata for type that will be designed by layout designer
     */
    typeMetadata: LayoutComponentMetadata<TTypeOptions>;
}