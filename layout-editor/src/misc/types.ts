import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {AsyncProperties} from '@anglr/dynamic';
import {Action, Func} from '@jscrpt/common';

import {LayoutEditorMetadataDescriptor, LayoutEditorMetadataInfo} from '../interfaces';

/**
 * Generic implementation of layout editor metadata descriptor, async version
 */
export abstract class GenericLayoutAsyncMetadata<TOptions> implements AsyncProperties<LayoutEditorMetadataDescriptor<TOptions>>
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
    public get isHorizontalDrop(): Promise<Func<boolean, [TOptions|undefined|null]>|undefined>
    {
        return this._getValue<Func<boolean, [TOptions|undefined|null]>|undefined>('isHorizontalDrop');
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

/**
 * Implementation of layout editor metadata descriptor
 */
export class LayoutEditorMetadataData<TOptions = any> implements LayoutEditorMetadataDescriptor<TOptions>
{
    //######################### protected fields #########################

    /**
     * Indication whether component was initialized
     */
    protected _initialized: boolean = false;

    //######################### public properties - implementation of LayoutEditorMetadataDescriptor #########################

    /**
     * @inheritdoc
     */
    public metaInfo?: LayoutEditorMetadataInfo;
    
    /**
     * @inheritdoc
     */
    public addDescendant?: Action<[LayoutComponentMetadata, TOptions, number]>;

    /**
     * @inheritdoc
     */
    public applyDesignerStyles?: Action<[TOptions|null|undefined, CSSStyleDeclaration]>;
    
    /**
     * @inheritdoc
     */
    public canDropMetadata?: Func<boolean, [TOptions|undefined|null]>;

    /**
     * @inheritdoc
     */
    public isHorizontalDrop?: Func<boolean, [TOptions|undefined|null]>;

    /**
     * @inheritdoc
     */
    public removeDescendant?: Action<[string, TOptions]>;

    //######################### constructor #########################
    constructor(protected _asyncMetadata: AsyncProperties<LayoutEditorMetadataDescriptor<TOptions>>)
    {
    }

    //######################### public methods #########################

    /**
     * Initialize object loads async data and freezes object
     */
    public async initialize(): Promise<void>
    {
        if(this._initialized)
        {
            return;
        }

        this.metaInfo = await this._asyncMetadata.metaInfo;
        this.addDescendant = await this._asyncMetadata.addDescendant;
        this.applyDesignerStyles = await this._asyncMetadata.applyDesignerStyles;
        this.canDropMetadata = await this._asyncMetadata.canDropMetadata;
        this.isHorizontalDrop = await this._asyncMetadata.isHorizontalDrop;
        this.removeDescendant = await this._asyncMetadata.removeDescendant;

        this._initialized = true;

        Object.freeze(this);
    }
}