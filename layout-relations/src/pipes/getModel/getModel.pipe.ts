import {Pipe, PipeTransform} from '@angular/core';
import {LayoutPropertiesModelType} from '@anglr/dynamic/layout-editor';

import {ContentComponentData} from '../../components';

/**
 * Gets properties model using its name
 */
@Pipe({name: 'getModel'})
export class GetModelSAPipe implements PipeTransform
{
    /**
     * Gets properties model using its name
     * @param value - Name of model class
     * @param metadata - Metadata containing model
     */
    public transform(value: string, metadata: ContentComponentData|undefined|null,): LayoutPropertiesModelType|null
    {
        return metadata?.editorMetadata.metaInfo?.optionsMetadata?.propertiesMetadata?.find(itm => itm.modelType.name == value)?.modelType ?? null;
    }
}