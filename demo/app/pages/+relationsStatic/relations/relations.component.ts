import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {RelationsManager} from '@anglr/dynamic/relations';

import {DemoData} from '../../../services/demoData';

/**
 * Page for displaying relations
 */
@Component(
{
    selector: 'relations-view',
    templateUrl: 'relations.component.html',
    // styleUrls: ['relations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: ''})
export class RelationsComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is relations sample click component visible
     */
    protected visible: boolean = true;

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
        this._relationsManager.setRelations(DemoData.relationsDemo);
    }
}