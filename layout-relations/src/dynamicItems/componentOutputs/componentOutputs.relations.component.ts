import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {ComponentOutputsRelationsMetadataLoader} from './componentOutputs.metadata';
import {ComponentOutputsRelationsOptions} from './componentOutputs.options';

/**
 * Relations used for connecting relations outputs with external relations
 */
@Component(
{
    selector: 'component-outputs',
    template: '',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(ComponentOutputsRelationsMetadataLoader)
export class ComponentOutputsRelationsSAComponent implements RelationsComponent<ComponentOutputsRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: ComponentOutputsRelationsOptions|undefined|null;

    //######################### public methods - implementation of RelationsComponent #########################
    
    // /**
    //  * @inheritdoc
    //  */
    // public ngOnChanges(changes: SimpleChanges): void
    // {
    //     if(nameof<NegationRelations>('condition') in changes)
    //     {
    //         this.negatedCondition = !this.condition;
    //     }
    // }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
    }
}