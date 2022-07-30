import {AppHotkeysService} from '@anglr/common/hotkeys';
import {Hotkey} from 'angular2-hotkeys';

import {MetadataHistoryManager} from '../metadataHistoryManager/metadataHistoryManager.service';
import {MetadataStorage} from '../metadataStorage/metadataStorage.service';

/**
 * Class that handles hotkeys for editors
 */
export class EditorHotkeys
{
    //######################### constructor #########################
    constructor(protected hotkeys: AppHotkeysService,
                protected historyManager: MetadataHistoryManager,
                protected metadataStorage: MetadataStorage,)
    {
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public destroy(): void
    {
        this.hotkeys.destroy();
    }

    //######################### public methods #########################

    /**
     * Initialize hotkeys
     */
    public init(): void
    {
        this.hotkeys.hotkeys.add(new Hotkey('ctrl+s', () =>
        {
            //TODO: improve class that stores metadata
            // this.metadataStorage.save();

            return false;
        }, ['INPUT', 'TEXTAREA'], 'Saves current state of editor'));

        this.hotkeys.hotkeys.add(new Hotkey('ctrl+z', () =>
        {
            this.historyManager.undo();

            return false;
        }, ['INPUT', 'TEXTAREA'], 'Undo current state of editor'));

        this.hotkeys.hotkeys.add(new Hotkey('ctrl+y', () =>
        {
            this.historyManager.redo();

            return false;
        }, ['INPUT', 'TEXTAREA'], 'Redo current state of editor'));
    }
}