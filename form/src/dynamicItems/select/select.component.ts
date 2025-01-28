import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase} from '@anglr/dynamic/form';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        FormPipesModule,
        CastPipesModule,
        ReactiveFormsModule,
        CommonModule,
    ]
})
@RelationsEditorMetadata(SelectRelationsMetadataLoader)
@LayoutEditorMetadata(SelectLayoutMetadataLoader)
export class SelectComponent extends FormComponentBase<SelectComponentOptions> implements FormComponent<SelectComponentOptions>
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