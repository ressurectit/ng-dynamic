import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorDesignerType, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {PlaceholderComponentOptions} from './placeholder.options';
import {PlaceholderLayoutDesignerTypeLoader, PlaceholderLayoutMetadataLoader} from './placeholder.metadata';
import {ComponentWithId} from '../../interfaces';
import {CustomComponentSAComponent} from '../customComponent/customComponent.component';

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
        CommonModule,
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorDesignerType(PlaceholderLayoutDesignerTypeLoader)
@LayoutEditorMetadata(PlaceholderLayoutMetadataLoader)
export class PlaceholderSAComponent extends LayoutComponentBase<PlaceholderComponentOptions> implements LayoutComponent<PlaceholderComponentOptions>, ComponentWithId
{
    //######################### protected properties #########################

    /**
     * Instance of parent custom component
     */
    protected parentCustomComponent: CustomComponentSAComponent|null = inject(CustomComponentSAComponent, {optional: true});

    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is used in custom component
     */
    protected inCustomComponent: boolean = !!this.parentCustomComponent;

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