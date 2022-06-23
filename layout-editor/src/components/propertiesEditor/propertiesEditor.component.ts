import {Component, ChangeDetectionStrategy} from '@angular/core';

/**
 * Component that represents editor for components options/properties
 */
@Component(
{
    selector: 'properties-editor',
    templateUrl: 'propertiesEditor.component.html',
    styleUrls: ['propertiesEditor.component.css'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertiesEditorSAComponent
{
}