import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TitledDialogService} from '@anglr/common/material';
import {PropertiesControl, PropertiesControlBase} from '@anglr/dynamic/layout-editor';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {RowsColumnsOptions} from '../../../interfaces';
import {RowsColumnsDefinitionDialogComponent} from '../rowsColumnsDefinitionDialog/rowsColumnsDefinitionDialog.component';

/**
 * Component used for displaying editation of rows and columns
 */
@Component(
{
    selector: 'rows-columns-properties-control',
    templateUrl: 'rowsColumnsPropertiesControl.component.html',
    styleUrl: 'rowsColumnsPropertiesControl.component.css',
    imports:
    [
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowsColumnsPropertiesControlComponent extends PropertiesControlBase<RowsColumnsOptions> implements PropertiesControl<RowsColumnsOptions>
{
    //######################### protected properties #########################

    /**
     * Service used for displaying dialog
     */
    protected dialog: TitledDialogService = inject(TitledDialogService);

    //######################### protected properties - template bindings #########################

    /**
     * Shows dialog used for defining rows and columns
     */
    protected async showDialog(): Promise<void>
    {
        if(!this.form)
        {
            throw new Error('RowsColumnsPropertiesControlComponent: missing form!');
        }

        const result = await lastValueFrom(this.dialog.open<RowsColumnsDefinitionDialogComponent, RowsColumnsOptions, RowsColumnsOptions|undefined>(RowsColumnsDefinitionDialogComponent,
        {
            title: 'define rows and columns',
            data: this.form.value as RowsColumnsOptions,
            width: '75vw',
        }).afterClosed());

        if(result)
        {
            this.form.patchValue(result);
        }
    }
}
