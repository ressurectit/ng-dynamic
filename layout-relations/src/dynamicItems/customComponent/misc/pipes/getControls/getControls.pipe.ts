import {Pipe, PipeTransform, Type} from '@angular/core';
import {PropertiesControl} from '@anglr/dynamic/layout-editor';

import {ContentComponentData} from '../../components/contentOptionsSelection/contentOptionsSelection.interface';

/**
 * Gets properties controls that are used for setting model value
 */
@Pipe({name: 'getControls', standalone: true})
export class GetControlsSAPipe implements PipeTransform
{
    /**
     * Gets properties controls that are used for setting model value
     * @param value - Name of model class
     * @param metadata - Metadata containing properties controls for model
     */
    public transform(value: string, metadata: ContentComponentData|undefined,): Type<PropertiesControl>[]
    {
        return metadata?.editorMetadata.metaInfo?.optionsMetadata?.propertiesMetadata?.find(itm => itm.modelType.name == value)?.propertiesControls ?? [];
    }
}