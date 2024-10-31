import {ChangeDetectorRef, Directive, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormModelGroup} from '@anglr/common/forms';
import {Dictionary, PromiseOr} from '@jscrpt/common';

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
    protected initialized: boolean = false;

    //######################### public properties - implementation of PropertiesControl #########################

    /**
     * @inheritdoc
     */
    @Input()
    public form: FormGroup<FormModelGroup<TOptions>>|undefined|null;

    /**
     * @inheritdoc
     */
    @Input()
    public propertiesMetadata: Dictionary<LayoutEditorPropertyMetadata&LayoutPropertyTypeData>|undefined|null = null;

    /**
     * @inheritdoc
     */
    @Input()
    public options: TOptions|undefined|null;

    //######################### constructor #########################
    constructor(protected changeDetector: ChangeDetectorRef,
                protected extractor: LayoutEditorMetadataExtractor,)
    {
    }

    //######################### public methods - implementation of OnInit #########################
    
    /**
     * Initialize component
     */
    public async ngOnInit(): Promise<void>
    {
        if(this.initialized)
        {
            return;
        }

        this.initialized = true;

        await this._initialize();
    }

    //######################### public methods - implementation of PropertiesControl #########################

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
        this.changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Use this method for initialization of component
     */
    protected _initialize(): PromiseOr<void>
    {
    }
}