import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormComponent, FormComponentBase} from '@anglr/dynamic/form';
import {FormPipesModule} from '@anglr/common/forms';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';

import {PeriodLayoutMetadataLoader, PeriodRelationsMetadataLoader} from './period.metadata';
import {PeriodComponentOptions} from './period.options';

/**
 * Component used for displaying period
 */
@Component(
{
    selector: 'form-period',
    templateUrl: 'period.component.html',
    styles: [HostDisplayBlockStyle],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        FormPipesModule,
        CastPipesModule,
        ReactiveFormsModule,
    ]
})
@RelationsEditorMetadata(PeriodRelationsMetadataLoader)
@LayoutEditorMetadata(PeriodLayoutMetadataLoader)
export class PeriodComponent extends FormComponentBase<PeriodComponentOptions> implements FormComponent<PeriodComponentOptions>
{}