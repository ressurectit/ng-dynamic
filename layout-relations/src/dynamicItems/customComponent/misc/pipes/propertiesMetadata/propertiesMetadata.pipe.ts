import {Pipe, PipeTransform} from '@angular/core';
import {LayoutEditorPropertyMetadata, LayoutEditorPropertyMetadataExtractor, LayoutPropertiesModelType} from '@anglr/dynamic/layout-editor';
import {Dictionary} from '@jscrpt/common';

/**
 * Gets properties metadata for for model type
 */
@Pipe({name: 'propertiesMetadata', standalone: true,})
export class PropertiesMetadataSAPipe implements PipeTransform
{
    //######################### constructor #########################
    constructor(protected propertyExtractor: LayoutEditorPropertyMetadataExtractor,)
    {
    }

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Gets properties metadata for for model type
     * @param value - Type of properties model
     */
    public transform(value: LayoutPropertiesModelType|null): Dictionary<LayoutEditorPropertyMetadata>|null
    {
        if(!value)
        {
            return null;
        }

        return this.propertyExtractor.extract(value);
    }
}