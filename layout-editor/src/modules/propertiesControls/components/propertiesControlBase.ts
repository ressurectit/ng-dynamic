import {ChangeDetectorRef, Directive, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormModelGroup} from '@anglr/common/forms';
import {Dictionary, PromiseOr, resolvePromiseOr} from '@jscrpt/common';

import {PropertiesControl} from '../../../interfaces';
import {LayoutEditorMetadataExtractor} from '../../../services';
import {LayoutEditorPropertyMetadata} from '../../../misc/types';
import {LayoutPropertyTypeData} from '../../../decorators';

/**
 * Base class for properties control
 */
@Directive()
export abstract class PropertiesControlBase<TOptions = any> implements PropertiesControl<TOptions>
{
    //######################### protected fields #########################

    /**
     * Indication whether was component initialized or not
     */
    protected _initialized: boolean = false;

    //######################### public properties - implementation of PropertiesControl #########################

    /**
     * @inheritdoc
     */
    @Input()
    public form: FormGroup<FormModelGroup<TOptions>>|undefined;

    /**
     * @inheritdoc
     */
    @Input()
    public propertiesMetadata: Dictionary<LayoutEditorPropertyMetadata&LayoutPropertyTypeData>|null = null;

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,
                protected _extractor: LayoutEditorMetadataExtractor,)
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

        await resolvePromiseOr(this._initialize());
    }

    //######################### public methods - implementation of PropertiesControl #########################

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
     * Use this method for initialization of component
     */
    protected _initialize(): PromiseOr<void>
    {
    }
}