import {Pipe, PipeTransform} from '@angular/core';
import {PropertiesControlGetter} from '@anglr/dynamic/layout-editor';

import {ContentComponentData} from '../../../../../components';

/**
 * Gets properties controls that are used for setting model value
 */
@Pipe({name: 'getControls'})
export class GetControlsPipe implements PipeTransform
{
    /**
     * Gets properties controls that are used for setting model value
     * @param value - Name of model class
     * @param metadata - Metadata containing properties controls for model
     */
    public transform(value: string, metadata: ContentComponentData|undefined|null,): PropertiesControlGetter[]
    {
        return metadata?.editorMetadata.metaInfo?.optionsMetadata?.propertiesMetadata?.find(itm => itm.modelType.name == value)?.propertiesControls ?? [];
    }
}
