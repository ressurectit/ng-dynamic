import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {SelectLayoutMetadataLoader, SelectRelationsMetadataLoader} from './select.metadata';
import {SelectComponentOptions} from './select.options';

/**
 * Component used for displaying text field
 */
@Component(
{
    selector: 'form-select',
    templateUrl: 'select.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        FormPipesModule,
        CastPipesModule,
        FormComponentControlSAPipe,
        ReactiveFormsModule,
        CommonModule,
    ]
})
@RelationsEditorMetadata(SelectRelationsMetadataLoader)
@LayoutEditorMetadata(SelectLayoutMetadataLoader)
export class SelectSAComponent extends FormComponentBase<SelectComponentOptions> implements FormComponent<SelectComponentOptions>
{
    //######################### public properties #########################

    protected _values: any[] = [
        {
            code: 'foo',
            value: 'foo value',
        },
        {
            code: 'bar',
            value: 'bar value',
        }
    ];

    //######################### poublic properties - inputs and outputs #########################

    /**
     * Indication whether form component is disabled
     */
    @Input()
    public set values(value: any[])
    {
        this._values = value;
    }
    public get values(): any[]
    {
        return this._values;
    }
}