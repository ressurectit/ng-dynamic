import {inject, Injectable, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Action1, Action2, NoopAction, WithSync} from '@jscrpt/common';

import {MONACO_EDITOR_RESOURCES_PATH} from '../../misc/tokens';
import {MonacoEditorType} from './amdMonacoEditorLoader.interface';

declare const require: Action2<string[], NoopAction>&{config: Action1<unknown>};

/**
 * Amd monaco editor loader
 */
@Injectable({providedIn: 'root'})
export class AmdMonacoEditorLoader implements OnDestroy
{
    //######################### protected fields #########################

    /**
     * Indication whether is loader initialized
     */
    protected initialized: boolean = false;

    /**
     * Instance of HTML document
     */
    protected document: Document = inject(DOCUMENT);

    /**
     * Instance of resources path
     */
    protected resourcesPath: string = inject(MONACO_EDITOR_RESOURCES_PATH);

    /**
     * Instance of AMD loader script
     */
    protected loaderScript: HTMLScriptElement|undefined|null;

    //######################### public methods #########################

    /**
     * Loads monaco editor using "AMD"
     */
    @WithSync()
    public loadMonacoEditor(): Promise<MonacoEditorType>
    {
        if(this.initialized)
        {
            return Promise.resolve((self as unknown as {monaco: MonacoEditorType}).monaco);
        }

        return new Promise<MonacoEditorType>(resolve =>
        {
            this.loaderScript = this.document.createElement('script');
            this.loaderScript.src = `${this.resourcesPath}/loader.js`;

            this.loaderScript.onload = () =>
            {
                require.config({ paths: { vs: this.resourcesPath }, baseUrl: self.location.origin });
                require(['vs/editor/editor.main'], () =>
                {
                    this.initialized = true;

                    resolve((self as unknown as {monaco: MonacoEditorType}).monaco);
                });
            };

            this.loaderScript.onerror = event =>
            {
                throw new Error(`AmdMonacoEditorLoader: failed to load monaco-editor scripts. '${event}'`);
            };

            this.loaderScript.onabort = event =>
            {
                throw new Error(`AmdMonacoEditorLoader: monaco-editor scripts load was aborted. '${event}'`);
            };

            this.loaderScript.oncancel = event =>
            {
                throw new Error(`AmdMonacoEditorLoader: monaco-editor scripts load was canceled. '${event}'`);
            };
    
            this.document.head.append(this.loaderScript);
        });
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * @inheritdoc
     */
    public ngOnDestroy(): void
    {
        this.loaderScript?.remove();
        this.loaderScript = null;
    }
}