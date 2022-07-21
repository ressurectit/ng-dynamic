import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {ComponentRoute, ComponentRedirectRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataManager} from '@anglr/dynamic/layout-editor';

import {LayoutDataService} from '../../../services/layoutData';

/**
 * Layout preview component
 */
@Component(
{
    selector: 'layout-preview-view',
    templateUrl: 'preview.component.html',
    providers:
    [
        LayoutEditorMetadataManager,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRedirectRoute('', 'preview')
@ComponentRoute({path: 'preview'})
@ComponentRoute({path: 'preview/:id'})
export class PreviewComponent implements OnInit, OnDestroy
{
    //######################### protected properties - template bindings #########################

    protected _available: FormControl = new FormControl('');

    protected _metadata: LayoutComponentMetadata = null;

    protected _availableNames: string[] = [];

    //######################### constructor #########################
    constructor(private _store: LayoutDataService,
                private _router: Router,
                private _route: ActivatedRoute,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._availableNames = this._store.getStored();

        this._route.params.subscribe(({id}) =>
        {
            if(id)
            {
                this._available.setValue(id);
                this._metadata = this._store.getData(id);
            }

            this._available.valueChanges.subscribe(val =>
            {
                this._router.navigate(['/preview', val], {skipLocationChange: false, replaceUrl: true});
            });
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
    }
}
