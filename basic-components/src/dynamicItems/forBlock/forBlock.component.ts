import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent, ScopedRelationsSADirective} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {ForBlockComponentOptions, ForBlockRelationsOptions} from './forBlock.options';
import {ForBlockLayoutDesignerTypeLoader, ForBlockLayoutMetadataLoader, ForBlockRelationsMetadataLoader} from './forBlock.metadata';

/**
 * Component used for displaying for block
 */
@Component(
{
    selector: 'for-block',
    templateUrl: 'forBlock.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        CommonModule,
        LayoutComponentRendererSADirective,
        ScopedRelationsSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(ForBlockLayoutDesignerTypeLoader)
@RelationsEditorMetadata(ForBlockRelationsMetadataLoader)
@LayoutEditorMetadata(ForBlockLayoutMetadataLoader)
export class ForBlockSAComponent extends LayoutComponentBase<ForBlockComponentOptions> implements LayoutComponent<ForBlockComponentOptions>, RelationsComponent<ForBlockRelationsOptions>
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: ForBlockRelationsOptions|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Array of data to be rendered in for cycle
     */
    @Input()
    public data: Array<any> = [];
}