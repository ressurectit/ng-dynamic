import {Component, ChangeDetectionStrategy, inject, FactoryProvider} from '@angular/core';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsChangeDetector, RelationsComponentManager, RelationsManager, RelationsProcessor} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PlaceholderComponentOptions} from './placeholder.options';
import {PlaceholderLayoutDesignerTypeLoader, PlaceholderLayoutMetadataLoader} from './placeholder.metadata';
import {ComponentWithId} from '../../interfaces';
import {PlaceholderHandler} from '../../services';
import {PlaceholderContainerComponentOptions} from '../placeholderContainer';
import {ContainerMetadataSAPipe} from './misc/pipes';

/**
 * Component used for displaying placeholder
 */
@Component(
{
    selector: 'placeholder',
    templateUrl: 'placeholder.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
        ContainerMetadataSAPipe,
    ],
    providers:
    [
        <FactoryProvider>
        {
            provide: RelationsComponentManager,
            useFactory: () => inject(PlaceholderHandler).relationsComponentManager,
        },
        <FactoryProvider>
        {
            provide: RelationsManager,
            useFactory: () => inject(PlaceholderHandler).relationsManager,
        },
        <FactoryProvider>
        {
            provide: RelationsProcessor,
            useFactory: () => inject(PlaceholderHandler).relationsProcessor,
        },
        <FactoryProvider>
        {
            provide: RelationsChangeDetector,
            useFactory: () => inject(PlaceholderHandler).relationsChangeDetector,
        },
        <FactoryProvider>
        {
            provide: PlaceholderHandler,
            useFactory: () =>
            {
                return new PlaceholderHandler(PlaceholderSAComponent);
            }
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(PlaceholderLayoutDesignerTypeLoader)
@LayoutEditorMetadata(PlaceholderLayoutMetadataLoader)
export class PlaceholderSAComponent extends LayoutComponentBase<PlaceholderComponentOptions> implements LayoutComponent<PlaceholderComponentOptions>, ComponentWithId
{
    //######################### protected properties #########################

    /**
     * Handler used for working with placeholder
     */
    protected placeholderHandler: PlaceholderHandler<PlaceholderContainerComponentOptions> = inject(PlaceholderHandler);

    //######################### public properties #########################

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