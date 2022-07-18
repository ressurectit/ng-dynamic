import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldAppearance, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {MaterialSelectLayoutMetadataLoader} from './select.metadata';
import {MaterialSelectComponentOptions} from './select.options';

/**
 * Component used for displaying material text field
 */
@Component(
{
    selector: 'material-select',
    templateUrl: 'select.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
    ]
})
@LayoutEditorMetadata(MaterialSelectLayoutMetadataLoader)
export class MaterialSelectSAComponent extends LayoutComponentBase<MaterialSelectComponentOptions> implements LayoutComponent<MaterialSelectComponentOptions>
{
    //######################### public properties #########################

    public values: any[] = ['foo', 'bar'];

    /**
     * Gets form field appearence
     */
    public get appearance(): MatFormFieldAppearance
    {
        return <MatFormFieldAppearance>this.options?.appearance;
    }
}