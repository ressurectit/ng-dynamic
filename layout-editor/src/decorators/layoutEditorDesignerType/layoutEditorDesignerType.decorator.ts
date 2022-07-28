import {Type} from '@angular/core';
import {DynamicClassMetadata, DynamicMetadataLoader} from '@anglr/dynamic';
import {LayoutComponent} from '@anglr/dynamic/layout';

import {LayoutEditorDesignerTypeType} from '../../decorators';

/**
 * Sets layout editor designer type for class on which is this decorator applied
 * @param metadataLoader - Layout editor designer type loader function used for obtaining designer type
 */
export function LayoutEditorDesignerType(metadataLoader: DynamicMetadataLoader<Type<LayoutComponent>>): ClassDecorator
{
    return DynamicClassMetadata<Type<LayoutComponent>, LayoutEditorDesignerTypeType>(metadataLoader, 'layoutEditorDesignerType');
}