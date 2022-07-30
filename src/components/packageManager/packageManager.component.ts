import {Component, ChangeDetectionStrategy} from '@angular/core';

/**
 * Component used as package manager of dynamic packages/modules
 */
@Component(
{
    selector: 'package-manager',
    templateUrl: 'packageManager.component.html',
    // styleUrls: ['packageManager.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PackageManagerSAComponent
{
}