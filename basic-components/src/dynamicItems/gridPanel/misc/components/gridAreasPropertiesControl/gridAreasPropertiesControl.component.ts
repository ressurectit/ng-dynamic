import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TitledDialogService} from '@anglr/common/material';
import {PropertiesControl, PropertiesControlBase} from '@anglr/dynamic/layout-editor';
import {FirstUppercaseLocalizePipe} from '@anglr/common';
import {lastValueFrom} from '@jscrpt/common/rxjs';

import {GridPanelComponentOptions} from '../../../gridPanel.options';
import {GridAreasDefinitionDialogComponent} from '../gridAreasDefinitionDialog/gridAreasDefinitionDialog.component';

/**
 * Component used for displaying editation of grid areas
 */
@Component(
{
    selector: 'grid-areas-properties-control',
    templateUrl: 'gridAreasPropertiesControl.component.html',
    styleUrl: 'gridAreasPropertiesControl.component.css',
    imports:
    [
        FirstUppercaseLocalizePipe,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridAreasPropertiesControlComponent extends PropertiesControlBase<GridPanelComponentOptions> implements PropertiesControl<GridPanelComponentOptions>
{
    //######################### protected properties #########################

    /**
     * Service used for displaying dialog
     */
    protected dialog: TitledDialogService = inject(TitledDialogService);

    //######################### protected properties - template bindings #########################

    /**
     * Shows dialog used for defining grid areas
     */
    protected async showDialog(): Promise<void>
    {
        if(!this.form)
        {
            throw new Error('GridAreasPropertiesControlComponent: missing form!');
        }

        const result = await lastValueFrom(this.dialog.open<GridAreasDefinitionDialogComponent, GridPanelComponentOptions, GridPanelComponentOptions|undefined>(GridAreasDefinitionDialogComponent,
        {
            title: 'define grid areas',
            data:
            {
                areas: this.form.value.areas ?? [],
                columns: this.options?.columns ?? [],
                rows: this.options?.rows ?? [],
            },
            width: '75vw',
            height: '75vh',
        }).afterClosed());

        if(result)
        {
            this.form.patchValue(result);
        }
    }
}
