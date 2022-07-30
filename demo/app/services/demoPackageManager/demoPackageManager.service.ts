import {PackageManager} from '@anglr/dynamic';
import {PromiseOr} from '@jscrpt/common';
import {Observable, Subject} from 'rxjs';

/**
 * Package manager for demo app
 */
export class DemoPackageManager extends PackageManager
{
    //######################### private fields #########################

    /**
     * Array of available packages
     */
    private _packages: readonly string[] = ['basic-components'];

    /**
     * Subject used for emitting changes in packages
     */
    private _packagesChangeSubject: Subject<void> = new Subject<void>();

    //######################### public properties - overrides #########################

    /**
     * @inheritdoc
     */
    public get packagesChange(): Observable<void>
    {
        return this._packagesChangeSubject.asObservable();
    }

    /**
     * @inheritdoc
     */
    public get packages(): readonly string[]
    {
        return this._packages;
    }

    //######################### constructor #########################
    constructor(storageName: string,)
    {
        super(storageName);
    }

    //######################### public methods - overrides #########################

    /**
     * @inheritdoc
     */
    public refresh(): PromiseOr<void>
    {
    }
}