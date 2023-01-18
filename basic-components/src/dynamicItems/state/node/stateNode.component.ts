import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeEditorContent, CodeEditorDialogComponent, CodeEditorDialogData, TypescriptLanguageModel} from '@anglr/dynamic';
import {RelationsNode, RelationsNodeBase, RelationNodeOutputSAComponent, RelationsNodeHeaderSAComponent, RelationNodeInputSAComponent} from '@anglr/dynamic/relations-editor';
import {ConfigureNodeEndpointData, ConfigureNodeEndpointSAComponent} from '@anglr/dynamic/layout-relations';
import {TitledDialogService} from '@anglr/common/material';
import {generateId} from '@jscrpt/common';
import typings from '!!raw-loader?esModule!@anglr/dynamic/typings/state';
import {languages} from 'monaco-editor';
import {lastValueFrom} from 'rxjs';

import {StateRelationsEditorOptions, StateRelationsInputFunctionData, StateRelationsOptions} from '../state.options';

languages.typescript.typescriptDefaults.addExtraLib(typings, 'file:///node_modules/@types/state/index.d.ts');

/**
 * Relations node component for transform data
 */
@Component(
{
    selector: 'state-node',
    templateUrl: 'stateNode.component.html',
    standalone: true,
    imports:
    [
        RelationsNodeHeaderSAComponent,
        RelationNodeInputSAComponent,
        RelationNodeOutputSAComponent,
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateNodeSAComponent extends RelationsNodeBase<StateRelationsOptions, StateRelationsEditorOptions> implements RelationsNode<StateRelationsOptions, StateRelationsEditorOptions>
{
    //######################### protected properties - template bindings #########################

    /**
     * Gets added input function names
     */
    protected get inputFunctions(): string[]
    {
        if(!this.metadata)
        {
            return [];
        }

        this.metadata.relationsOptions ??= 
        {
        inputFunctions: {},
        };

        return Object.keys(this.metadata.relationsOptions.inputFunctions ?? {});
    }

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                protected dialog: TitledDialogService,)
    {
        super(changeDetector, element);
    }

    //######################### protected methods - template bindings #########################

    /**
     * Adds new input function
     */
    protected async addInputFunc(): Promise<void>
    {
        const inputFunc: StateRelationsInputFunctionData = 
        {
            id: generateId(12),
            code: null,
        };

        const name: ConfigureNodeEndpointData =
        {
            name: `inputFunc${this.inputFunctions.length + 1}`,
            defaultValue: null,
            onlyName: true,
        };

        if(await this.configureEndpoint(name))
        {
            if(!this.metadata?.relationsOptions || !this.metadata.nodeMetadata)
            {
                return;
            }

            this.metadata.relationsOptions.inputFunctions ??= {};
            this.metadata.relationsOptions.inputFunctions[name.name] = inputFunc;

            this.metadata.nodeMetadata.options ??= 
            {
                contents: {}
            };

            if(this.metadata.nodeMetadata.options.contents)
            {
                this.metadata.nodeMetadata.options.contents[name.name] = '';
            }

            this.history.getNewState();
        }
    }

    /**
     * Removes input function
     * @param name - Name of input function to be removed
     */
    protected removeInputFunc(name: string): void
    {
        if(this.metadata?.relationsOptions?.inputFunctions && name in this.metadata.relationsOptions.inputFunctions)
        {
            delete this.metadata.relationsOptions.inputFunctions[name];

            if(this.metadata.nodeMetadata?.options?.contents)
            {
                delete this.metadata.nodeMetadata.options.contents[name];
            }

            this.history.getNewState();
        }
    }

    /**
     * Configures endpoint
     * @param endpoint - Endpoint to be configured
     */
    protected async configureEndpoint(endpoint: ConfigureNodeEndpointData): Promise<boolean>
    {
        const copy = JSON.parse(JSON.stringify(endpoint));
        
        const result = await lastValueFrom(this.dialog.open<ConfigureNodeEndpointSAComponent, ConfigureNodeEndpointData, true|undefined|null>(ConfigureNodeEndpointSAComponent,
        {
            title: 'configure input endpoint',
            width: '60vw',
            data: copy,
        }).afterClosed());

        //rename
        if(result)
        {
            if(this.metadata?.relationsOptions?.inputFunctions?.[endpoint.name] && this.metadata.nodeMetadata?.options?.contents?.[endpoint.name])
            {
                this.metadata.relationsOptions.inputFunctions[copy.name] = this.metadata.relationsOptions.inputFunctions[endpoint.name];
                delete this.metadata.relationsOptions.inputFunctions[endpoint.name];
    
                this.metadata.nodeMetadata.options.contents[copy.name] = this.metadata.nodeMetadata.options.contents[endpoint.name];
                delete this.metadata.nodeMetadata.options.contents[endpoint.name];
    
                this.history.getNewState();
            }
            else
            {
                endpoint.name = copy.name;
            }
        }

        return result ?? false;
    }

    /**
     * Shows code editor
     * @param name - Name of input func
     */
    protected async showCodeEditor(name: string): Promise<void>
    {
        const result = await lastValueFrom(this.dialog.open<CodeEditorDialogComponent, CodeEditorDialogData, CodeEditorContent|null>(CodeEditorDialogComponent,
        {
            title: 'Code editor',
            width: '75vw',
            height: '75vh',
            data: 
            {
                content: this.metadata?.nodeMetadata?.options?.contents?.[name] ?? '',
                languageModel: TypescriptLanguageModel(
`import {InputFunction} from 'state';

/**
 * Input function that handles incoming data and can change state
 */
const inputFunc: InputFunction<any, any> = function(_data)
{
};

export default inputFunc;

`),
            }
        }).afterClosed());

        if(!this.metadata?.relationsOptions || !result || !this.metadata.nodeMetadata)
        {
            return;
        }

        this.metadata.relationsOptions.inputFunctions ??= {};
        this.metadata.nodeMetadata.options ??= 
        {
            contents: {}
        };

        this.metadata.nodeMetadata.options.contents ??= {};

        this.metadata.relationsOptions.inputFunctions[name].code = result.code;
        this.metadata.nodeMetadata.options.contents[name] = result.content;

        this.history.getNewState();
    }
}