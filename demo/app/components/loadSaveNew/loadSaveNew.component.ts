import {Component, ChangeDetectionStrategy, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgSelectModule} from '@anglr/select';
import {extend, Func} from '@jscrpt/common';

import {StoreDataService} from '../../services/storeData';

/**
 * Component used for loading saving and creating new layout/relations template
 */
@Component(
{
    selector: 'load-save-new',
    templateUrl: 'loadSaveNew.component.html',
    styleUrls: ['loadSaveNew.component.scss'],
    standalone: true,
    imports:
    [
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadSaveNewSAComponent<TMetadata = any> implements OnInit
{
    //######################### protected properties - template bindings #########################

    protected _metadata: TMetadata|null = null;
    
    protected _available: FormControl = new FormControl('');

    protected _name: FormControl = new FormControl(null);

    protected _availableNames: string[] = [];

    //######################### public properties - inputs #########################

    @Input()
    public store: StoreDataService;

    @Input()
    public routePath: string;

    @Input()
    public getMetadataCallback: Func<TMetadata>;

    //######################### public properties - outputs #########################

    @Output()
    public metadataChange: EventEmitter<TMetadata|null> = new EventEmitter<TMetadata|null>();

    //######################### constructor #########################
    constructor(private _router: Router,
                private _route: ActivatedRoute,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._availableNames = this.store.getStored();

        this._route.params.subscribe(({id}) =>
        {
            if(!id)
            {
                this._metadata = null;
                this.metadataChange.next(this._metadata);

                this._name.setValue('');
                this._available.setValue('');
            }
            else
            {
                this._name.setValue(id);
                this._available.setValue(id);
                this._metadata = this.store.getData(this._available.value);
                this.metadataChange.next(this._metadata);
            }
        });
    }

    //######################### protected methods - template bindings #########################

    protected _load(): void
    {
        this._metadata = this.store.getData(this._available.value);
        this.metadataChange.next(this._metadata);
        this._name.setValue(this._available.value);

        this._router.navigate([this.routePath, this._available.value], {skipLocationChange: false, replaceUrl: true});
    }

    protected _save(): void
    {
        const data = this.store.getData(this._name.value) ?? {};

        this.store.setData(this._name.value, extend(data, this.getMetadataCallback()));

        this._availableNames = this.store.getStored();
        this._router.navigate([this.routePath, this._name.value], {skipLocationChange: false, replaceUrl: true});
    }

    protected _delete(): void
    {
        this.store.removeData(this._available.value);

        this._availableNames = this.store.getStored();
        this._router.navigate([this.routePath], {skipLocationChange: false, replaceUrl: true});
    }

    protected _new(): void
    {
        this._metadata = null;
        this.metadataChange.next(this._metadata);

        this._name.setValue('');
        this._available.setValue('');
        
        this._router.navigate([this.routePath], {skipLocationChange: false, replaceUrl: true});
    }
}