import {ChangeDetectorRef, Directive, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PromiseOr} from '@jscrpt/common';

import {PropertyTypeControl} from '../../../interfaces';

/**
 * Base class for property type control
 */
@Directive()
export abstract class PropertyTypeControlBase<TValue = any> implements PropertyTypeControl<TValue>, OnInit
{
    //######################### protected fields #########################

    /**
     * Backing field for control
     */
    protected _control: FormControl<TValue|undefined|null>|undefined|null;

    /**
     * Indication whether was component already initialized
     */
    protected _initialized: boolean = false;

    //######################### public properties - implementation of PropertyTypeControl #########################

    /**
     * @inheritdoc
     */
    @Input()
    public get control(): FormControl<TValue|undefined|null>|undefined|null
    {
        return this._control;
    }
    public set control(value: FormControl<TValue|undefined|null>|undefined|null)
    {
        this._control = value;

        this._controlSet();
    }

    /**
     * @inheritdoc
     */
    @Input()
    public values: TValue[] = [];

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        if(this._initialized)
        {
            return;
        }

        this._initialized = true;

        await this._initialize();
    }

    //######################### public methods - implementation of PropertyTypeControl #########################

    /**
     * @inheritdoc
     */
    public async initialize(): Promise<void>
    {
        await this.ngOnInit();
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
     * Use this method for initialization of component
     */
    protected _initialize(): PromiseOr<void>
    {
    }

    /**
     * When overriden allows to react to change of control
     */
    protected _controlSet(): void
    {
    }
}