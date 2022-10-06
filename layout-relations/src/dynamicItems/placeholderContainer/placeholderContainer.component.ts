import {Component, ChangeDetectionStrategy} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PlaceholderContainerComponentOptions} from './placeholderContainer.options';
import {PlaceholderContainerLayoutDesignerTypeLoader, PlaceholderContainerLayoutMetadataLoader} from './placeholderContainer.metadata';
import {ComponentWithId} from '../../interfaces';

/**
 * Component used for displaying placeholder container
 */
@Component(
{
    selector: 'placeholder-container',
    templateUrl: 'placeholderContainer.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(PlaceholderContainerLayoutDesignerTypeLoader)
@LayoutEditorMetadata(PlaceholderContainerLayoutMetadataLoader)
export class PlaceholderContainerSAComponent extends LayoutComponentBase<PlaceholderContainerComponentOptions> implements LayoutComponent<PlaceholderContainerComponentOptions>, ComponentWithId
{
    //######################### protected properties #########################

    /**
     * @inheritdoc
     */
    public id: string = '';

    //######################### public methods #########################

    /**
     * @inheritdoc
     */
    public setId(id: string): void
    {
        this.id = id;
    }
}