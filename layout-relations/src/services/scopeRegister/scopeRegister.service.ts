import {Injectable, OnDestroy} from '@angular/core';
import {ScopeRegister as RelationsScopeRegister} from '@anglr/dynamic/relations-editor';
import {DebounceCall, WithSync} from '@jscrpt/common';
import {Subscription} from 'rxjs';

import {LayoutComponentsRegister} from '../layoutComponentsRegister/layoutComponentsRegister.service';
import {LayoutManager} from '../layoutManager/layoutManager.service';

/**
 * Service that is used for obtaining existing scopes from layout
 */
@Injectable()
export class ScopeRegister extends RelationsScopeRegister implements OnDestroy
{
    //######################### protoected properties #########################

    /**
     * Subscriptions created during initialization
     */
    protected initSubscriptions: Subscription = new Subscription();

    //######################### constructor #########################
    constructor(protected layoutManager: LayoutManager,
                protected componentRegister: LayoutComponentsRegister,)
    {
        super();

        this.initSubscriptions.add(this.layoutManager.layoutChange.subscribe(() => this.getScopes()));
        this.getScopes();
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.initSubscriptions.unsubscribe();
    }

    //######################### protected methods #########################

    /**
     * Gets available scopes
     */
    @DebounceCall(10)
    @WithSync()
    protected async getScopes(): Promise<void>
    {
        this.ɵScopes = [];
        const types = await this.componentRegister.types;

        for(const type of types)
        {
            let scope: string|undefined|null = null;

            if((scope = await this.componentRegister.getScope(type)))
            {
                if(this.ɵScopes.indexOf(scope) < 0)
                {
                    this.ɵScopes.push(scope);
                }
            }
        }

        this.scopesChangeSubject.next();
    }
}