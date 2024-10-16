import {Component, ChangeDetectionStrategy, inject, WritableSignal, signal} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TITLED_DIALOG_DATA} from '@anglr/common/material';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {FirstUppercaseLocalizeSAPipe, TooltipDirective} from '@anglr/common';
import {generateId, isBlank} from '@jscrpt/common';

import {GridPanelComponentOptions} from '../../../gridPanel.options';
import {GridPanelAreaComponentOptions} from '../../../../gridPanelArea';
import {StringToColorPipe, ToGridColumnsTemplatePipe, ToGridRowsTemplatePipe} from '../../../../../misc/pipes';

/**
 * Component used for defining grid areas
 */
@Component(
{
    selector: 'grid-areas-definition-dialog',
    templateUrl: 'gridAreasDefinitionDialog.component.html',
    styleUrl: 'gridAreasDefinitionDialog.component.css',
    standalone: true,
    imports:
    [
        FirstUppercaseLocalizeSAPipe,
        ToGridColumnsTemplatePipe,
        ToGridRowsTemplatePipe,
        ReactiveFormsModule,
        StringToColorPipe,
        TooltipDirective,
        MatDialogModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridAreasDefinitionDialogComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Options for grid panel whose area is being set
     */
    protected options: GridPanelComponentOptions = inject<GridPanelComponentOptions>(TITLED_DIALOG_DATA);

    /**
     * Available grid areas
     */
    protected areas: LayoutComponentMetadata<GridPanelAreaComponentOptions>[] = [...inject<GridPanelComponentOptions>(TITLED_DIALOG_DATA).areas];

    /**
     * Indication whether is area under editation
     */
    protected editing: WritableSignal<boolean> = signal(false);

    /**
     * Index of currently edited area
     */
    protected editedIndex: WritableSignal<number|undefined|null> = signal(null);

    /**
     * Copy of currently edited area coordinates
     */
    protected editedArea: WritableSignal<GridPanelAreaComponentOptions|undefined|null> = signal(null);

    /**
     * Form control for changing display name
     */
    protected displayNameForm: FormControl<string> = new FormControl<string>('', {nonNullable: true});

    //######################### protected methods - template bindings #########################

    /**
     * Ends editation of area
     */
    protected endEditation(): void
    {
        const editedIndex = this.editedIndex();

        if(isBlank(editedIndex))
        {
            return;
        }

        this.areas[editedIndex].displayName = this.displayNameForm.value;

        this.editing.set(false);
        this.editedIndex.set(null);
        this.displayNameForm.setValue('');
    }

    /**
     * Enable adding of grid area
     */
    protected addArea(): void
    {
        const id = `gridPanelArea-${generateId(10)}`;

        this.areas.push(
        {
            id,
            name: 'gridPanelArea',
            package: 'basic-components',
            displayName: id,
            scope: null,
            options:
            {
                gridColumnEnd: -1,
                gridColumnStart: 1,
                gridRowEnd: -1,
                gridRowStart: 1,
            }
        });

        const editedIndex = this.areas.length - 1;

        this.editing.set(true);
        this.editedIndex.set(editedIndex);
        this.displayNameForm.setValue(this.areas[editedIndex].displayName ?? id);
    }

    /**
     * Sets row and column ends for area
     * @param row - Start index of row
     * @param column - Start index of column
     */
    protected setAreaEnd(row: number, column: number): void
    {
        if(!this.editedArea())
        {
            return;
        }

        this.editedArea.update(editedArea =>
        {
            if(!editedArea)
            {
                throw new Error('GridAreasDefinitionDialogComponent: edited area was not set!');
            }

            return {
                gridColumnStart: editedArea.gridColumnStart,
                gridColumnEnd: column + 2,
                gridRowStart: editedArea.gridRowStart,
                gridRowEnd: row + 2,
            };
        });
    }

    /**
     * Selects row and column for area, first time start, second time end
     * @param row - Start index of row
     * @param column - Start index of column
     */
    protected selectArea(row: number, column: number): void
    {
        if(!this.editing())
        {
            return;
        }

        const editedIndex = this.editedIndex();

        if(isBlank(editedIndex))
        {
            throw new Error('GridAreasDefinitionDialogComponent: edited index was not set!');
        }
        
        if(this.editedArea())
        {
            this.areas[editedIndex].options = {...this.areas[editedIndex].options, ...this.editedArea()} as GridPanelAreaComponentOptions;
            this.editedArea.set(null);

            return;
        }

        const editedArea = this.areas[editedIndex].options;
        
        if(isBlank(editedArea))
        {
            throw new Error('GridAreasDefinitionDialogComponent: edited area was not set!');
        }

        this.editedArea.set(
        {
            gridRowStart: row + 1,
            gridColumnStart: column + 1,
            gridColumnEnd: editedArea.gridColumnEnd,
            gridRowEnd: editedArea.gridRowEnd,
        });
    }

    /**
     * Enables editation of area
     * @param index - Index of area to be edited
     */
    protected editArea(index: number): void
    {
        this.editing.set(true);
        this.editedIndex.set(index);
        this.displayNameForm.setValue(this.areas[index].displayName ?? '');
    }

    /**
     * Removes area
     * @param index - Index of area to be removed
     */
    protected removeArea(index: number): void
    {
        this.endEditation();

        this.areas.splice(index, 1);
    }
}