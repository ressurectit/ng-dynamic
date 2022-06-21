import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {AsyncProperties} from '@anglr/dynamic';
import {Action, Func} from '@jscrpt/common';

import {LayoutEditorMetadataDescriptor} from '../interfaces';

/**
 * Generic implementation of layout editor metadata descriptor
 */
export abstract class GenericLayoutMetadata<TOptions> implements AsyncProperties<LayoutEditorMetadataDescriptor<TOptions>>
{
    //######################### protected fields #########################

    /**
     * Instance of obtained layout editor metadata descriptor
     */
    protected _instance?: LayoutEditorMetadataDescriptor<TOptions>;

    //######################### public properties - implementation of async LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public get descendantsGetter(): Promise<Func<LayoutComponentMetadata|LayoutComponentMetadata[]|null|undefined, [LayoutComponentMetadata<TOptions>]>>
    {
        return this._getValue<Func<LayoutComponentMetadata|LayoutComponentMetadata[]|null|undefined, [LayoutComponentMetadata<TOptions>]>>('descendantsGetter');
    }

    /**
     * @inheritdoc
     */
    public get applyDesignerStyles(): Promise<Action<[TOptions|null|undefined, CSSStyleDeclaration]>>
    {
        return this._getValue<Action<[TOptions|null|undefined, CSSStyleDeclaration]>>('applyDesignerStyles');
    }

    //######################### protected methods #########################

    /**
     * Gets value from layout editor metadata descriptor property
     * @param property - Property which value should be obtained
     */
    protected async _getValue<TValue>(property: keyof LayoutEditorMetadataDescriptor): Promise<TValue>
    {
        const instance = this._instance ??= await this._getInstance();

        return instance[property] as any;
    }

    /**
     * Gets instance of layout editor metadata descriptor
     */
    protected abstract _getInstance(): Promise<LayoutEditorMetadataDescriptor<TOptions>>;
}