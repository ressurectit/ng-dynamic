import {Injectable} from '@angular/core';
import {PackageManager} from '@anglr/dynamic';

/**
 * Package manager for demo app
 */
@Injectable()
export class DemoPackageManager extends PackageManager
{
    //######################### constructor #########################
    constructor()
    {
        super('PACKAGES_STORE');
    }
}