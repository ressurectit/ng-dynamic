import {Injectable} from '@angular/core';
import {PackageManager} from '@anglr/dynamic';

/**
 * Relations package manager for demo app
 */
@Injectable()
export class DemoRelationsPackageManager extends PackageManager
{
    //######################### constructor #########################
    constructor()
    {
        super('RELATIONS_PACKAGES_STORE');
    }
}