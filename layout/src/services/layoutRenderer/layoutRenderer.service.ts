import {Injectable, ViewContainerRef, inject} from '@angular/core';
import {LOGGER, Logger} from '@anglr/common';
import {DynamicItemExtensionType} from '@anglr/dynamic';
import {WithSync} from '@jscrpt/common';

import {LayoutComponentMetadata} from '../../interfaces';
import {LayoutRendererItem} from './layoutRenderer.interface';

/**
 * Service used for handling rendering of layout
 */
@Injectable()
export class LayoutRenderer
{
    //######################### protected properties #########################

    /**
     * Instance of logger used for creating logs
     */
    protected logger: Logger = inject(LOGGER);

    /**
     * Map of renderers and their data
     */
    protected renderers: Record<string, LayoutRendererItem|undefined|null> = {};

    /**
     * Map of renderers and their data using rendered compmonent id
     */
    protected components: Record<string, LayoutRendererItem|undefined|null> = {};

    //######################### public methods #########################
    
    @WithSync()
    public async registerRenderer(id: string,
                                  parentId: string|undefined|null,
                                  viewContainer: ViewContainerRef,
                                  metadata: LayoutComponentMetadata,
                                  parentMetadata: LayoutComponentMetadata|undefined|null,
                                  scopeId: string|undefined|null,
                                  childExtensions: DynamicItemExtensionType[]|undefined|null,): Promise<void>
    {
    }

    @WithSync()
    public async unregisterRenderer(): Promise<void>
    {
    }
}