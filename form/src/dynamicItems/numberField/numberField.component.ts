import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {CastPipesModule, HostDisplayBlockStyle} from '@anglr/common';
import {FormPipesModule} from '@anglr/common/forms';
import {FormComponent, FormComponentBase, FormComponentControlSAPipe} from '@anglr/dynamic/form';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {PromiseOr, isPresent} from '@jscrpt/common';

import {NumberFieldLayoutMetadataLoader, NumberFieldRelationsMetadataLoader} from './numberField.metadata';
import {NumberFieldComponentOptions} from './numberField.options';

/**
 * Component used for displaying text field
 */
@Component(
{
    selector: 'form-number-field',
    templateUrl: 'numberField.component.html',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:
    [
        FormPipesModule,
        CastPipesModule,
        FormComponentControlSAPipe,
        ReactiveFormsModule,
    ]
})
@RelationsEditorMetadata(NumberFieldRelationsMetadataLoader)
@LayoutEditorMetadata(NumberFieldLayoutMetadataLoader)
export class NumberFieldSAComponent extends FormComponentBase<NumberFieldComponentOptions> implements FormComponent<NumberFieldComponentOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Input number step value
     */
    public step: string = '1';

    //######################### protected methods #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): PromiseOr<void>
    {
        this.step = !this.options || !isPresent(this.options?.decimalPlaces) || this.options?.decimalPlaces == 0 ? '1' : '0.' + '0'.repeat(this.options.decimalPlaces - 1) + '1';

        super.onOptionsSet();
    }

    /**
     * Registers component-specific validators
     */
    protected override _registerValidations(): void
    {
        if (this.options)
        {
            if (isPresent(this.options?.min))
            {
                this.control?.addValidators(Validators.min(this.options.min));
            }

            if (isPresent(this.options?.max))
            {
                this.control?.addValidators(Validators.max(this.options.max));
            }
        }
    }
}