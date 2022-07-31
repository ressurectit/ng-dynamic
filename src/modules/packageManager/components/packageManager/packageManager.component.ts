import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';

import {PackageManager} from '../../../../services';

//TODO: animations

/**
 * Component used as package manager of dynamic packages/modules
 */
@Component(
{
    selector: 'package-manager',
    templateUrl: 'packageManager.component.html',
    styleUrls: ['packageManager.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackageManagerComponent implements OnInit
{
    //######################### protected properties - template bindings #########################

    /**
     * Indication whether is detail visible
     */
    protected detailVisible: boolean = false;

    /**
     * Array of used packages
     */
    protected usedPackages: string[] = [];

    /**
     * Array of available packages
     */
    protected availablePackages: readonly string[] = [];

    //######################### constructor #########################
    constructor(protected packageManager: PackageManager,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): void
    {
        this.usedPackages = this.packageManager.usedPackages;
        this.updatedAvailablePackages();
    }

    //######################### protected methods - template bindings #########################

    /**
     * Adds package to used packages
     * @param packageName - Name of package to be added
     */
    protected addPackage(packageName: string|null): void
    {
        if(!packageName)
        {
            return;
        }

        this.usedPackages = [...this.usedPackages, packageName];
        this.updatedAvailablePackages();
        this.packageManager.setUsedPackages(this.usedPackages);
    }

    /**
     * Removes package from used packages
     * @param packageName - Name of package to be removed
     */
    protected removePackage(packageName: string): void
    {
        this.usedPackages = this.usedPackages.filter(itm => itm != packageName);
        this.updatedAvailablePackages();
        this.packageManager.setUsedPackages(this.usedPackages);
    }

    //######################### protected methods #########################

    /**
     * Updates available packages using used packages
     */
    protected updatedAvailablePackages(): void
    {
        this.availablePackages = this.packageManager.packages.filter(itm => !this.usedPackages.find(it => it == itm));
    }
}