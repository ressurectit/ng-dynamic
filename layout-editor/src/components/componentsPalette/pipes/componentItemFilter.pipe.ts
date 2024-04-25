import {ChangeDetectorRef, Inject, OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {LocalizeSAPipe, STRING_LOCALIZATION, StringLocalization} from '@anglr/common';
import {isArray} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {ComponentsPaletteItem} from '../componentsPalette.interface';

@Pipe(
{
    name: 'componentItemFilter',
    standalone: true,
})
export class ComponentItemFilterSAPipe implements PipeTransform, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Localize pipe used for localizing string
     */
    protected localizePipe: LocalizeSAPipe;

    /**
     * Subscription for changes of texts
     */
    protected subscription: Subscription|undefined|null;

    //######################### constructor #########################
    constructor(@Inject(STRING_LOCALIZATION) protected localizationSvc: StringLocalization,
                protected changeDetector: ChangeDetectorRef,)
    {
        this.localizePipe = new LocalizeSAPipe(localizationSvc, changeDetector);
    }

    //######################### public methods - PipeTransform #########################

    /**
     * Filters list of node groups with search value
     * @param value - Value to be filtered
     * @param interpolateParams - Optional object storing interpolation parameters
     */
    public transform(value: (ComponentsPaletteItem & {temp?: boolean})[], filter: string|undefined|null): (ComponentsPaletteItem & {temp?: boolean})[]
    {
        if (!isArray(value) || !filter)
        {
            return value;
        }

        return value.filter(component =>
        {
            return this.localizePipe.transform(component.metadata.metaInfo?.name ?? component.itemSource.name)?.toLowerCase().indexOf(filter?.toLowerCase()) >= 0;
        });
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.subscription = this.localizationSvc.textsChange.subscribe(() => this.changeDetector.markForCheck());
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.localizePipe.ngOnDestroy();
        this.subscription?.unsubscribe();
    }
}