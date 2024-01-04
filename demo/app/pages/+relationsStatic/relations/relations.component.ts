import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {ComponentRoute} from '@anglr/common/router';
import {provideDynamic} from '@anglr/dynamic';
import {RelationsManager, withRelationsRuntime} from '@anglr/dynamic/relations';

import {DemoData} from '../../../services/demoData';
import {RelationsResultSAComponent, RelationsSampleClickSAComponent} from '../../../components';

/**
 * Page for displaying relations
 */
@Component(
{
    selector: 'relations-view',
    templateUrl: 'relations.component.html',
    standalone: true,
    imports:
    [
        RelationsSampleClickSAComponent,
        RelationsResultSAComponent,
    ],
    providers:
    [
        provideDynamic([withRelationsRuntime()]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@ComponentRoute({path: ''})
export class RelationsComponent implements OnInit
{
    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is relations sample click component visible
     */
    protected visible: boolean = true;

    /**
     * String text to be set when input has changed
     */
    protected text: string = '';

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
        this._relationsManager.setRelations(DemoData.relationsStaticDemo);
    }
}