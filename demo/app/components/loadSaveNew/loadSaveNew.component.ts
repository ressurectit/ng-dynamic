import {Component, ChangeDetectionStrategy, Input, OnInit, EventEmitter, Output, OnDestroy, Inject, Optional, ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgSelectModule} from '@anglr/select';
import {EditorHotkeys, MetadataHistoryManager, MetadataStateManager, METADATA_STATE_MANAGER} from '@anglr/dynamic';
import {extend, Func} from '@jscrpt/common';
import {Subscription} from 'rxjs';

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
export class LoadSaveNewSAComponent<TStoreMetadata = any, TMetadata = any> implements OnInit, OnDestroy
{
    //######################### protected properties - template bindings #########################

    protected _metadata: TStoreMetadata|null = null;
    
    protected _available: FormControl = new FormControl('');

    protected _name: FormControl = new FormControl(null);

    protected _availableNames: string[] = [];

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    //######################### public properties - inputs #########################

    @Input()
    public store: StoreDataService<TStoreMetadata>;

    @Input()
    public history: MetadataHistoryManager|null = null;

    @Input()
    public routePath: string;

    @Input()
    public getMetadataCallback: Func<TStoreMetadata, [TMetadata]>;

    //######################### public properties - outputs #########################

    @Output()
    public metadataChange: EventEmitter<TStoreMetadata|null> = new EventEmitter<TStoreMetadata|null>();

    //######################### constructor #########################
    constructor(private _router: Router,
                private _route: ActivatedRoute,
                @Inject(METADATA_STATE_MANAGER) private _metaManager: MetadataStateManager<TMetadata>,
                private _changeDetector: ChangeDetectorRef,
                @Optional() private _hotkeys?: EditorHotkeys,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        if(this._hotkeys)
        {
            this.initSubscriptions.add(this._hotkeys.save.subscribe(() => this._save()));
            this.initSubscriptions.add(this._hotkeys.new.subscribe(() => this._new()));
        }

        if(this.history)
        {
            this.initSubscriptions.add(this.history.historyChange.subscribe(() => this._changeDetector.detectChanges()));
            this.initSubscriptions.add(this.history.pop.subscribe(() => this._changeDetector.detectChanges()));
        }

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

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
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
        this._saveData(this._metaManager.getMetadata());
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

    protected _saveData(metadata: TMetadata): void
    {
        const data = this.store.getData(this._name.value) ?? {};
        this.history?.save();

        this.store.setData(this._name.value, extend(data, this.getMetadataCallback(metadata)));

        this._availableNames = this.store.getStored();
        this._changeDetector.detectChanges();
        this._router.navigate([this.routePath, this._name.value], {skipLocationChange: false, replaceUrl: true});
    }
}