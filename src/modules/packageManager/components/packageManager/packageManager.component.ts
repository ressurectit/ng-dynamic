import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

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

    /**
     * Instance of form control for handling available packages
     */
    protected control: FormControl<string> = new FormControl();

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
        this.availablePackages = this.packageManager.packages;
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
        this.packageManager.setUsedPackages(this.usedPackages);
    }

    /**
     * Removes package from used packages
     * @param packageName - Name of package to be removed
     */
    protected removePackage(packageName: string): void
    {
        this.usedPackages = this.usedPackages.filter(itm => itm != packageName);
        this.packageManager.setUsedPackages(this.usedPackages);
    }
}