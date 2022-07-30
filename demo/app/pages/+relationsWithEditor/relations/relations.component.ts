import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {provideRelations, RelationsManager} from '@anglr/dynamic/relations';
import {provideTinyMceRelations} from '@anglr/dynamic/tinymce-components';
import {provideHandlebarsRelations} from '@anglr/dynamic/handlebars-components';

import {DemoData} from '../../../services/demoData';

//TODO: check why relations does not work after returning from editor

/**
 * Page for displaying relations
 */
@Component(
{
    selector: 'relations-view',
    templateUrl: 'relations.component.html',
    // styleUrls: ['relations.component.scss'],
    providers:
    [
        provideRelations(),
        provideTinyMceRelations(),
        provideHandlebarsRelations(),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: ''})
export class RelationsComponent
{
    //######################### constructor #########################
    constructor(private _relationsManager: RelationsManager,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this._relationsManager.setRelations(DemoData.relationsStaticWithEditorDemo);
    }
}