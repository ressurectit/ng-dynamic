import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {AsyncProperties} from '@anglr/dynamic';
import {Action, Func} from '@jscrpt/common';

import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '../interfaces';

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
     * Meta information about layout component
     */
    public get metaInfo(): Promise<LayoutEditorMetadataInfo|undefined>
    {
        return this._getValue<LayoutEditorMetadataInfo|undefined>('metaInfo');
    }

    /**
     * @inheritdoc
     */
    public get addDescendant(): Promise<Action<[LayoutComponentMetadata, TOptions, number]>|undefined>
    {
        return this._getValue<Action<[LayoutComponentMetadata, TOptions, number]>|undefined>('addDescendant');
    }

    /**
     * @inheritdoc
     */
    public get applyDesignerStyles(): Promise<Action<[TOptions|null|undefined, CSSStyleDeclaration]>|undefined>
    {
        return this._getValue<Action<[TOptions|null|undefined, CSSStyleDeclaration]>|undefined>('applyDesignerStyles');
    }

    /**
     * @inheritdoc
     */
    public get canDropMetadata(): Promise<Func<boolean, [TOptions|undefined|null]>|undefined>
    {
        return this._getValue<Func<boolean, [TOptions|undefined|null]>|undefined>('canDropMetadata');
    }

    /**
     * @inheritdoc
     */
    public get removeDescendant(): Promise<Action<[string, TOptions]>|undefined>
    {
        return this._getValue<Action<[string, TOptions]>|undefined>('removeDescendant');
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