import {inject, Injectable, OnDestroy} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Action1, Action2, NoopAction} from '@jscrpt/common';

import {MONACO_EDITOR_RESOURCES_PATH} from '../../misc/tokens';

declare const require: Action2<string[], NoopAction>&{config: Action1<unknown>};

/**
 * Amd monaco editor loader
 */
@Injectable({providedIn: 'root'})
export class AmdMonacoEditorLoader implements OnDestroy
{
    //######################### protected fields #########################

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
    public loadMonacoEditor(): Promise<void>
    {
        return new Promise<void>(resolve =>
        {
            this.loaderScript = this.document.createElement('script');
            this.loaderScript.src = `${this.resourcesPath}/loader.js`;

            this.loaderScript.onload = () =>
            {
                require.config({ paths: { vs: this.resourcesPath }, baseUrl: self.location.origin });
                require(['vs/editor/editor.main'], function () {});

                resolve();
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