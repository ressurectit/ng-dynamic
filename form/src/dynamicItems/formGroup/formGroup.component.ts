import {Component, ChangeDetectionStrategy, ValueProvider, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {PromiseOr} from '@jscrpt/common';

import {FormGroupLayoutMetadataLoader} from './formGroup.metadata';
import {FormGroupComponentOptions} from './formGroup.options';
import {FORM_COMPONENT_CONTROL} from '../../misc/tokens';
import {FormComponentBase} from '../../components';

/**
 * Component used for displaying stack panel layout
 */
@Component(
{
    selector: 'form-group',
    templateUrl: 'formGroup.component.html',
    imports:
    [
        CommonModule,
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<FormGroupComponentOptions>(options => options?.children ?? [])
@LayoutEditorMetadata(FormGroupLayoutMetadataLoader)
export class FormGroupComponent extends FormComponentBase<FormGroupComponentOptions> implements LayoutComponent<FormGroupComponentOptions>
{
    //######################### protected properties #########################

    /**
     * Array of form specific providers
     */
    protected formProviders: Provider[] = [];

    //######################### protected methods #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): PromiseOr<void>
    {
        this.formProviders =
        [
            <ValueProvider>
            {
                provide: FORM_COMPONENT_CONTROL,
                useValue: this.options?.controlName ? this.parentControl?.get(this.options.controlName) : null,
            }
        ];
    }
}