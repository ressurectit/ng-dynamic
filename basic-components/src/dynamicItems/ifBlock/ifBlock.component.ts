import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {DebugData, RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {nameof} from '@jscrpt/common';

import {IfBlockComponentOptions} from './ifBlock.options';
import {IfBlockLayoutDesignerTypeLoader, IfBlockLayoutMetadataLoader, IfBlockRelationsMetadataLoader} from './ifBlock.metadata';

/**
 * Component used for displaying if block
 */
@Component(
{
    selector: 'if-block',
    templateUrl: 'ifBlock.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        CommonModule,
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DebugData(
{
    inputs:
    [
        nameof<IfBlockComponent>('condition'),
    ],
})
@DescendantsGetter<IfBlockComponentOptions>(options => options?.content ? [options?.content] : [])
@LayoutEditorDesignerType(IfBlockLayoutDesignerTypeLoader)
@RelationsEditorMetadata(IfBlockRelationsMetadataLoader)
@LayoutEditorMetadata(IfBlockLayoutMetadataLoader)
export class IfBlockComponent extends LayoutComponentBase<IfBlockComponentOptions> implements LayoutComponent<IfBlockComponentOptions>, RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public properties - inputs #########################

    /**
     * Condition used for displaying content of if block
     */
    @Input()
    public condition: boolean = true;

    //######################### protected - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        this.condition = this.options?.condition ?? false;
    }
}