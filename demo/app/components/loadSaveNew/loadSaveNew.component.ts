import {Component, ChangeDetectionStrategy, Input, OnInit, EventEmitter, Output, OnDestroy, Inject, Optional, ChangeDetectorRef, booleanAttribute} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgSelectModule} from '@anglr/select';
import {EditorHotkeys, MetadataHistoryManager, EditorMetadataManager, EDITOR_METADATA_MANAGER} from '@anglr/dynamic';
import {CustomDynamicItemsRegister, ShowCustomComponentOptionsSADirective} from '@anglr/dynamic/layout-relations';
import {LiveEventService} from '@anglr/dynamic/layout-editor';
import {extend, Func, isBlank} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {StoreDataService} from '../../services/storeData';
import {DemoCustomComponentsRegister} from '../../services/demoCustomComponentsRegister';
import {DemoCustomRelationsRegister} from '../../services/demoCustomRelationsRegister';

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
        ShowCustomComponentOptionsSADirective,
        MatSlideToggleModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadSaveNewComponent<TStoreMetadata = unknown, TMetadata = unknown> implements OnInit, OnDestroy
{
    //######################### protected properties - template bindings #########################

    protected metadata: TStoreMetadata|null = null;

    protected available: FormControl<string> = new FormControl<string>('', {nonNullable: true});

    protected component: FormControl<boolean> = new FormControl<boolean>(false, {nonNullable: true});

    protected name: FormControl = new FormControl(null);

    protected availableNames: string[] = [];

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    //######################### public properties - inputs #########################

    @Input({required: true})
    public store!: StoreDataService<TStoreMetadata>;

    @Input()
    public history: MetadataHistoryManager|null = null;

    @Input({required: true})
    public routePath!: string;

    @Input({required: true})
    public getMetadataCallback!: Func<TStoreMetadata, [TMetadata]>;

    @Input()
    public componentMarking: boolean = false;

    @Input({transform: booleanAttribute})
    public isRelations: boolean = false;

    //######################### public properties - outputs #########################

    @Output()
    public metadataChange: EventEmitter<TStoreMetadata|null> = new EventEmitter<TStoreMetadata|null>();

    //######################### constructor #########################
    constructor(private _router: Router,
                private _route: ActivatedRoute,
                @Inject(EDITOR_METADATA_MANAGER) private _metaManager: EditorMetadataManager<TMetadata>,
                private _changeDetector: ChangeDetectorRef,
                @Optional() protected liveEvents?: LiveEventService,

                @Inject(CustomDynamicItemsRegister) @Optional() protected customComponentsRegister?: DemoCustomRelationsRegister|DemoCustomComponentsRegister,
                @Optional() private _hotkeys?: EditorHotkeys,)
    {
    }

    //######################### public methods - implementation of OnInit #########################

    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        if(this.componentMarking)
        {
            this.available.valueChanges.subscribe(async value =>
            {
                if(!value)
                {
                    return;
                }

                const components = await this.customComponentsRegister?.getRegisteredComponents();

                if(isBlank(components))
                {
                    throw new Error('LoadSaveNewSAComponent: missing components!');
                }

                this.component.setValue(components.indexOf(value) >= 0, {emitEvent: false});
            });

            this.component.valueChanges.subscribe(() => this.customComponentsRegister?.toggleRegisteredComponent(this.available.value));
        }

        if(this._hotkeys)
        {
            this.initSubscriptions.add(this._hotkeys.save.subscribe(() => this.save()));
        }

        if(this.history)
        {
            this.initSubscriptions.add(this.history.historyChange.subscribe(() => this._changeDetector.detectChanges()));
            this.initSubscriptions.add(this.history.pop.subscribe(() => this._changeDetector.detectChanges()));
        }

        this.availableNames = this.store.getStored();

        this._route.params.subscribe(({id}) =>
        {
            if(!id)
            {
                this.metadata = null;
                this.metadataChange.next(this.metadata);

                this.name.setValue('');
                this.available.setValue('');
            }
            else
            {
                this.name.setValue(id);
                this.available.setValue(id);
                this.metadata = this.store.getData(this.available.value);
                this.metadataChange.next(this.metadata);
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

    protected load(): void
    {
        this.metadata = this.store.getData(this.available.value);
        this.metadataChange.next(this.metadata);
        this.name.setValue(this.available.value);

        this._router.navigate([this.routePath, this.available.value], {skipLocationChange: false, replaceUrl: true});
    }

    protected save(): void
    {
        const metadata = this._metaManager.getMetadata();

        if(metadata)
        {
            this.saveData(metadata);
        }
    }

    protected delete(): void
    {
        this.store.removeData(this.available.value);

        this.availableNames = this.store.getStored();
        this._router.navigate([this.routePath], {skipLocationChange: false, replaceUrl: true});
    }

    protected new(): void
    {
        this.metadata = null;
        this.metadataChange.next(this.metadata);

        this.name.setValue('');
        this.available.setValue('');

        this._router.navigate([this.routePath], {skipLocationChange: false, replaceUrl: true});
    }

    protected saveData(metadata: TMetadata): void
    {
        const data = this.store.getData(this.name.value) ?? (this.isRelations ? [] : {});
        this.history?.save();

        this.store.setData(this.name.value, extend(data, this.getMetadataCallback(metadata)));

        this.availableNames = this.store.getStored();
        this._changeDetector.detectChanges();
        this._router.navigate([this.routePath, this.name.value], {skipLocationChange: false, replaceUrl: true});
    }
}