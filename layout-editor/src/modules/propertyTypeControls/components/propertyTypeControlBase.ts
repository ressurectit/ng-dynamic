import {ChangeDetectorRef, Directive, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PromiseOr, resolvePromiseOr} from '@jscrpt/common';

import {PropertyTypeControl} from '../../../interfaces';
import {LayoutEditorPropertyMetadata} from '../../../misc/types';

/**
 * Base class for property type control
 */
@Directive()
export abstract class PropertyTypeControlBase<TValue = any, TValues = unknown> implements PropertyTypeControl<TValue, TValues>, OnInit
{
    //######################### protected fields #########################

    /**
     * Backing field for control
     */
    protected _control: FormControl<TValue>|undefined;

    /**
     * Backing field for metadata
     */
    protected _metadata: LayoutEditorPropertyMetadata<TValues>|undefined;

    /**
     * Backing field for name
     */
    protected _name: string|undefined;

    /**
     * Indication whether was component already initialized
     */
    protected _initialized: boolean = false;

    //######################### public properties - implementation of PropertyTypeControl #########################

    /**
     * @inheritdoc
     */
    @Input()
    public get control(): FormControl<TValue>|undefined
    {
        return this._control;
    }
    public set control(value: FormControl<TValue>|undefined)
    {
        this._control = value;

        this._controlsSet();
    }

    /**
     * @inheritdoc
     */
    @Input()
    public get metadata(): LayoutEditorPropertyMetadata<TValues>|undefined
    {
        return this._metadata;
    }
    public set metadata(value: LayoutEditorPropertyMetadata<TValues>|undefined)
    {
        this._metadata = value;
    }

    /**
     * @inheritdoc
     */
    @Input()
    public get name(): string|undefined
    {
        return this._name;
    }
    public set name(value: string|undefined)
    {
        this._name = value;
    }

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public ngOnInit(): PromiseOr<void>
    {
        if(this._initialized)
        {
            return;
        }

        this._initialized = true;
    }

    //######################### public methods - implementation of PropertyTypeControl #########################

    /**
     * @inheritdoc
     */
    public async initialize(): Promise<void>
    {
        await resolvePromiseOr(this.ngOnInit());
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Allows specific code to be called when controls are set
     */
    protected _controlsSet(): void
    {
    }
}