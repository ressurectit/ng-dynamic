import {Component, ChangeDetectionStrategy, OnInit, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ComponentRoute} from '@anglr/common/router';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {LayoutEditorMetadataManager, LAYOUT_DESIGNER_COMPONENT_TRANSFORM} from '@anglr/dynamic/layout-editor';
import {StackPanelComponentOptions} from '@anglr/dynamic/basic-components';
import {generateId} from '@jscrpt/common';

import {LayoutDataService} from '../../../services/layoutData';

/**
 * Layout editor component
 */
@Component(
{
    selector: 'layout-editor-view',
    templateUrl: 'editor.component.html',
    providers:
    [
        LAYOUT_DESIGNER_COMPONENT_TRANSFORM,
        LayoutEditorMetadataManager,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: 'editor'})
@ComponentRoute({path: 'editor/:id'})
export class EditorComponent implements OnInit, OnDestroy
{
    //######################### protected properties - template bindings #########################

    protected _metadata: LayoutComponentMetadata|null = null;
    
    protected _available: FormControl = new FormControl('');

    protected _name: FormControl = new FormControl(null);

    protected _availableNames: string[] = [];

    //######################### constructor #########################
    constructor(private _manager: LayoutEditorMetadataManager,
                private _store: LayoutDataService,
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
        this._availableNames = this._store.getStoredLayouts();
        
        this._route.params.subscribe(({id}) =>
        {
            if(!id)
            {
                this._metadata =
                {
                    id: `stackPanel-${generateId(10)}`,
                    package: 'basic-components',
                    name: 'stackPanel',
                    options: <StackPanelComponentOptions>
                    {
                        children: [],
                    },
                };

                this._name.setValue('');
                this._available.setValue('');
            }
            else
            {
                this._name.setValue(id);
                this._available.setValue(id);
                this._metadata = this._store.getLayoutData(this._available.value);
            }
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
    }

    //######################### protected methods - template bindings #########################

    protected _load(): void
    {
        this._metadata = this._store.getLayoutData(this._available.value);
        this._name.setValue(this._available.value);

        this._router.navigate(['/editor', this._available.value], {skipLocationChange: false, replaceUrl: true});
    }

    protected _save(): void
    {
        this._store.setLayoutData(this._name.value, this._manager.getMetadata());

        this._availableNames = this._store.getStoredLayouts();
        this._router.navigate(['/editor', this._name.value], {skipLocationChange: false, replaceUrl: true});
    }

    protected _delete(): void
    {
        this._store.removeLayoutData(this._available.value);

        this._availableNames = this._store.getStoredLayouts();
        this._router.navigate(['/editor'], {skipLocationChange: false, replaceUrl: true});
    }

    protected _new(): void
    {
        this._metadata =
        {
            id: `stackPanel-${generateId(10)}`,
            package: 'basic-components',
            name: 'stackPanel',
            options: <StackPanelComponentOptions>
            {
                children: [],
            },
        };

        this._name.setValue('');
        this._available.setValue('');
        
        this._router.navigate(['/editor'], {skipLocationChange: false, replaceUrl: true});
    }

    // /**
    //  * Gets metadata for current metadata manager
    //  */
    // protected getMetadata(): void
    // {
        
    //     console.log(this._manager.root);
    //     console.log(this._manager.flatTree);
    //     console.log(this._manager.flatTree.map(itm => itm.component.options.typeMetadata.id));
    // }
}
