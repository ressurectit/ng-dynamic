import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PackageManager} from '../../services';

//TODO: animations

/**
 * Component used as package manager of dynamic packages/modules
 */
@Component(
{
    selector: 'package-manager',
    templateUrl: 'packageManager.component.html',
    styleUrls: ['packageManager.component.css'],
    standalone: true,
    imports:
    [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackageManagerSAComponent implements OnInit
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
        this.availablePackages = this.packageManager.packages;
    }
}