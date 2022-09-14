import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

/**
 * Service that is used for obtaining existing scopes
 */
@Injectable()
export class ScopeRegister
{
    //######################### protected properties #########################

    /**
     * Array of all scopes
     */
    protected ɵScopes: string[] = [];

    /**
     * Subject used for emitting changes of scopes
     */
    protected scopesChangeSubject: Subject<void> = new Subject<void>();

    //######################### public properties #########################

    /**
     * Gets array of all scopes
     */
    public get scopes(): string[]
    {
        return this.ɵScopes;
    }

    /**
     * Occurs when array of scopes changes
     */
    public get scopesChange(): Observable<void>
    {
        return this.scopesChangeSubject.asObservable();
    }
}