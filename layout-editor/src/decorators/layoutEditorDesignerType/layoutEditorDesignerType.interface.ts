import {Type} from '@angular/core';
import {LayoutComponent} from '@anglr/dynamic/layout';

/**
 * Definition of type that holds layout editor designer type
 */
export interface LayoutEditorDesignerTypeType
{
    /**
     * Type for layout editor designer
     */
    layoutEditorDesignerType?: Promise<Type<LayoutComponent>>;
}