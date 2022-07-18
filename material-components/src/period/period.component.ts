import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatFormFieldAppearance, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';

import {MaterialPeriodLayoutMetadataLoader} from './period.metadata';
import {MaterialPeriodComponentOptions} from './period.options';

/**
 * Component used for displaying material period
 */
@Component(
{
    selector: 'material-period',
    templateUrl: 'period.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        MatFormFieldModule,
        MatInputModule,
    ]
})
@LayoutEditorMetadata(MaterialPeriodLayoutMetadataLoader)
export class MaterialPeriodSAComponent extends LayoutComponentBase<MaterialPeriodComponentOptions> implements LayoutComponent<MaterialPeriodComponentOptions>
{
    //######################### public properties #########################

    /**
     * Gets form field appearence
     */
    public get appearance(): MatFormFieldAppearance
    {
        return <MatFormFieldAppearance>this.options?.appearance;
    }
}