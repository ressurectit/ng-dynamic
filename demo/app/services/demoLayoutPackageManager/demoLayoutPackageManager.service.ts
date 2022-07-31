import {Injectable} from '@angular/core';
import {PackageManager} from '@anglr/dynamic';

/**
 * Layout package manager for demo app
 */
@Injectable()
export class DemoLayoutPackageManager extends PackageManager
{
    //######################### constructor #########################
    constructor()
    {
        super('LAYOUT_PACKAGES_STORE');
    }
}