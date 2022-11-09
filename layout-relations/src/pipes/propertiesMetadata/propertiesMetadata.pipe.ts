import {Optional, Pipe, PipeTransform} from '@angular/core';
import {LayoutEditorPropertyMetadata, LayoutEditorPropertyMetadataExtractor, LayoutPropertiesModelType} from '@anglr/dynamic/layout-editor';
import {Dictionary} from '@jscrpt/common';

/**
 * Gets properties metadata for for model type
 */
@Pipe({name: 'propertiesMetadata', standalone: true,})
export class PropertiesMetadataSAPipe implements PipeTransform
{
    //######################### constructor #########################
    constructor(@Optional() protected propertyExtractor?: LayoutEditorPropertyMetadataExtractor,)
    {
    }

    //######################### public methods - implementation of PipeTransform #########################

    /**
     * Gets properties metadata for for model type
     * @param value - Type of properties model
     * @param propertyExtractor - Extractor used for obtaining metadata for model
     */
    public transform(value: LayoutPropertiesModelType|null, propertyExtractor?: LayoutEditorPropertyMetadataExtractor): Dictionary<LayoutEditorPropertyMetadata>|null
    {
        if(!value)
        {
            return null;
        }

        this.propertyExtractor ??= propertyExtractor;

        if(!this.propertyExtractor)
        {
            throw new Error('Please provide LayoutEditorPropertyMetadataExtractor for propertiesMetadata pipe!');
        }

        return this.propertyExtractor.extract(value);
    }
}