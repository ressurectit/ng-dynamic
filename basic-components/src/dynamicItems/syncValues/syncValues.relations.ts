import {SimpleChanges} from '@angular/core';
import {PureRelationsComponent, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {SyncValuesRelationsMetadataLoader} from './syncValues.metadata';
import {SyncValuesRelationsOptions} from './syncValues.options';

/**
 * Sync values relations component
 */
@PureRelationsComponent()
@RelationsEditorMetadata(SyncValuesRelationsMetadataLoader)
export class SyncValuesRelations implements RelationsComponent<SyncValuesRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: SyncValuesRelationsOptions|undefined|null;

    //######################### public methods - implementation of RelationsComponent #########################
    
    /**
     * @inheritdoc
     */
    public ngOnChanges(_changes: SimpleChanges): void
    {
        // if(nameof<SyncValuesRelations>('value') in changes)
        // {
        // }
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}