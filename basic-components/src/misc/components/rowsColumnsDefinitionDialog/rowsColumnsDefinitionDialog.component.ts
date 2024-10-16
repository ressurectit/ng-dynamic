import {Component, ChangeDetectionStrategy, Signal, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatDialogModule} from '@angular/material/dialog';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';
import {FirstUppercaseLocalizeSAPipe, TooltipDirective} from '@anglr/common';

import {ColumnDefinition, RowDefinition, RowsColumnsOptions} from '../../../interfaces';
import {ColumnDefinitionFormValueAccessorDirective, RowDefinitionFormValueAccessorDirective} from '../../directives';
import {ToGridColumnsTemplatePipe, ToGridRowsTemplatePipe} from '../../pipes';

/**
 * Type defining form type
 */
interface FormType
{
    /**
     * Form array for columns definition
     */
    columns: FormArray<FormControl<ColumnDefinition>>;

    /**
     * Form array for rows definition
     */
    rows: FormArray<FormControl<RowDefinition>>;
}

/**
 * Component used for defining columns and rows
 */
@Component(
{
    selector: 'columns-rows-definition-dialog',
    templateUrl: 'rowsColumnsDefinitionDialog.component.html',
    styleUrl: 'rowsColumnsDefinitionDialog.component.css',
    standalone: true,
    imports:
    [
        ColumnDefinitionFormValueAccessorDirective,
        RowDefinitionFormValueAccessorDirective,
        FirstUppercaseLocalizeSAPipe,
        ToGridColumnsTemplatePipe,
        ToGridRowsTemplatePipe,
        ReactiveFormsModule,
        TooltipDirective,
        MatDialogModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowsColumnsDefinitionDialogComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Form for handling rows and columns
     */
    protected form: FormGroup<FormType> = new FormGroup<FormType>(
    {
        columns: new FormArray<FormControl<ColumnDefinition>>([]),
        rows: new FormArray<FormControl<RowDefinition>>([]),
    });

    /**
     * Count of cells total
     */
    protected cellsCount: Signal<number[]>;

    //######################### constructor #########################
    constructor()
    {
        const rowsColumnsOptions = inject<RowsColumnsOptions>(TITLED_DIALOG_DATA);
        
        for(const row of rowsColumnsOptions.rows)
        {
            this.form.controls.rows.push(new FormControl<RowDefinition>(
            {
                height: row.height,
            }, {nonNullable: true, validators: Validators.required}));
        }

        for(const column of rowsColumnsOptions.columns)
        {
            this.form.controls.columns.push(new FormControl<ColumnDefinition>(
            {
                width: column.width,
            }, {nonNullable: true, validators: Validators.required}));
        }

        const form = toSignal(this.form.valueChanges, {initialValue: {columns: this.form.value.columns, rows: this.form.value.rows}});

        this.cellsCount = computed(() => 
        {
            const count = (form()?.columns?.length || 1) * (form()?.rows?.length || 1);
            const result = [];

            for(let x = 0; x < count; x++)
            {
                result.push(x);
            }

            return result;
        });
    }

    //######################### protected methods - template bindings #########################

    /**
     * Adds new row definition
     */
    protected addRow(): void
    {
        this.form.controls.rows.push(new FormControl<RowDefinition>(
        {
            height: '1fr',
        }, {nonNullable: true, validators: Validators.required}));
    }

    /**
     * Adds new column definition
     */
    protected addColumn(): void
    {
        this.form.controls.columns.push(new FormControl<ColumnDefinition>(
        {
            width: '1fr',
        }, {nonNullable: true, validators: Validators.required}));
    }

    /**
     * Remove row definition
     * @param index - Index of removed row
     */
    protected removeRow(index: number): void
    {
        this.form.controls.rows.removeAt(index);
    }

    /**
     * Removes column definition
     * @param index - Index of removed column
     */
    protected removeColumn(index: number): void
    {
        this.form.controls.columns.removeAt(index);
    }
}