import {Component, ChangeDetectionStrategy, Injector, ValueProvider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
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
    standalone: true,
    imports:
    [
        CommonModule,
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(FormGroupLayoutMetadataLoader)
export class FormGroupSAComponent extends FormComponentBase<FormGroupComponentOptions> implements LayoutComponent<FormGroupComponentOptions>
{
    //######################### protected properties #########################

    protected _formInjector?: Injector;

    //######################### protected methods #########################

    /**
     * Called on initialzation of component, options are already set
     */
    protected override _onInit(): PromiseOr<void>
    {
        this._formInjector = Injector.create(
            {
                parent: this._injector,
                providers:
                [
                    <ValueProvider>
                    {
                        provide: FORM_COMPONENT_CONTROL,
                        useValue: this.options?.controlName ? this._control?.get(this.options.controlName) : null,
                    }
                ]
            }
        );
    }
}