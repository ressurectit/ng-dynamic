import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutDesignerSAComponent} from '@anglr/dynamic/layout-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {HostDisplayBlockStyle} from '@anglr/common';
import {generateId} from '@jscrpt/common';

import {ListBlockComponentOptions, ListBlockRelationsOptions} from '../listBlock.options';
import {ListBlockSAComponent} from '../listBlock.component';

/**
 * Component used for displaying list block designer
 */
@Component(
{
    selector: 'list-block-designer',
    templateUrl: 'listBlockDesigner.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListBlockDesignerSAComponent extends ListBlockSAComponent implements LayoutComponent<ListBlockComponentOptions>, RelationsComponent<ListBlockRelationsOptions>
{
    //######################### protected properties #########################

    /**
     * Instance of designer component
     */
    protected designer: LayoutDesignerSAComponent = inject(LayoutDesignerSAComponent);

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): void
    {
        if(!this.designer.options)
        {
            return;
        }

        this.designer.options.typeMetadata.scope ??= generateId(10);
    }
}