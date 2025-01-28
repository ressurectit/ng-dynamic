import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {DebugData, RelationsComponent, ScopedRelationsSADirective} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {nameof} from '@jscrpt/common';

import {ListBlockComponentOptions, ListBlockRelationsOptions} from './listBlock.options';
import {ListBlockLayoutDesignerTypeLoader, ListBlockLayoutMetadataLoader, ListBlockRelationsMetadataLoader} from './listBlock.metadata';
import {ListBlockScopeRelationsSADirective} from './misc/directives';

/**
 * Component used for displaying list block
 */
@Component(
{
    selector: 'list-block',
    templateUrl: 'listBlock.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        CommonModule,
        LayoutComponentRendererSADirective,
        ScopedRelationsSADirective,
        ListBlockScopeRelationsSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DebugData(
{
    inputs:
    [
        nameof<ListBlockSAComponent>('data'),
    ],
})
@DescendantsGetter<ListBlockComponentOptions>(options => options?.template ? [options?.template] : [])
@LayoutEditorDesignerType(ListBlockLayoutDesignerTypeLoader)
@RelationsEditorMetadata(ListBlockRelationsMetadataLoader)
@LayoutEditorMetadata(ListBlockLayoutMetadataLoader)
export class ListBlockSAComponent<TDatum = any> extends LayoutComponentBase<ListBlockComponentOptions> implements LayoutComponent<ListBlockComponentOptions>, RelationsComponent<ListBlockRelationsOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Id of current component
     */
    protected id: string = '';

    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: ListBlockRelationsOptions|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Array of data to be rendered in for cycle
     */
    @Input()
    public data: Array<TDatum> = [];

    //######################### public methods #########################

    /**
     * Sets id of custom component
     * @param id - Id of custom component
     */
    public setId(id: string): void
    {
        this.id = id;
    }
}