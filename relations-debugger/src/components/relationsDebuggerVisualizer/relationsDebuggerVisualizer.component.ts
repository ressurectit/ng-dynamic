import {Component, ChangeDetectionStrategy, EventEmitter, Output, ClassProvider} from '@angular/core';
import {RelationsCanvasSAComponent, RELATIONS_HISTORY_MANAGER} from '@anglr/dynamic/relations-editor';
import {RelationsNodeManager} from '@anglr/dynamic/relations-editor';

import {MetadataHistoryManagerDebug} from '../../services';

/**
 * Component used for visualization of relations debugger data
 */
@Component(
{
    selector: 'relations-debugger-visualizer',
    templateUrl: 'relationsDebuggerVisualizer.component.html',
    standalone: true,
    imports:
    [
        RelationsCanvasSAComponent,
    ],
    providers:
    [
        RelationsNodeManager,
        <ClassProvider>
        {
            provide: RELATIONS_HISTORY_MANAGER,
            useClass: MetadataHistoryManagerDebug,
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationsDebuggerVisualizerSAComponent
{
    //######################### protected properties - template bindings #########################

    /**
     * Playing through debugging steps
     */
    protected playing: boolean = false;

    //######################### public properties - outputs #########################

    /**
     * Occurs when user is trying to close visualizer
     */
    @Output()
    public close: EventEmitter<void> = new EventEmitter<void>();

    //######################### protected methods - template bindings #########################

    /**
     * Toggles play mode 
     */
    protected togglePlay(): void
    {
        this.playing = !this.playing;
    }
}