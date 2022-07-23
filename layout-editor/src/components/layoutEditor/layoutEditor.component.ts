import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {LayoutComponentMetadata, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {HostDisplayBlockStyle} from '@anglr/common';

import {ComponentsPaletteSAComponent} from '../componentsPalette/componentsPalette.component';
import {ComponentsTreeSAComponent} from '../componentsTree/componentsTree.component';
import {PropertiesEditorSAComponent} from '../propertiesEditor/propertiesEditor.component';
import {LAYOUT_DESIGNER_COMPONENT_TRANSFORM} from '../../misc/providers';

/**
 * Component that represents layout editor with palette, tree and properties
 */
@Component(
{
    selector: 'layout-editor',
    templateUrl: 'layoutEditor.component.html',
    // styleUrls: ['layoutEditor.component.scss'],
    styles: [HostDisplayBlockStyle],
    providers:
    [
        LAYOUT_DESIGNER_COMPONENT_TRANSFORM,
    ],
    standalone: true,
    imports:
    [
        ComponentsTreeSAComponent,
        ComponentsPaletteSAComponent,
        PropertiesEditorSAComponent,
        LayoutComponentRendererSADirective,
        MatTabsModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutEditorSAComponent
{
    //######################### public properties - inputs #########################

    /**
     * Metadata that are used for rendering
     */
    @Input()
    public metadata: LayoutComponentMetadata|undefined|null = null;
}