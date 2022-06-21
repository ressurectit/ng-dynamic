import {ChangeDetectorRef, Directive, ElementRef, Inject, Optional} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';

import {LayoutComponent} from '../../interfaces';

/**
 * Base component for layout component
 */
@Directive()
export abstract class LayoutComponentBase<TOptions> implements LayoutComponent<TOptions>
{
    //######################### protected fields #########################

    /**
     * Options used for rendering this component
     */
    protected _options: TOptions|undefined|null;

    //######################### public properties - implementation of LayoutComponent #########################

    /**
     * Options used for rendering this component
     */
    public get options(): TOptions|undefined|null
    {
        return this._options;
    }
    public set options(value: TOptions|undefined|null)
    {
        this._options = value;

        this._optionsSet();
    }

    //######################### constructor #########################
    constructor(protected _changeDetector: ChangeDetectorRef,
                protected _element: ElementRef<HTMLElement>,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of LayoutComponent #########################

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    public invalidateVisuals(): void
    {
        this._changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Method that is called when options are set, allows register custom code that is called when options are changing
     */
    protected _optionsSet(): void
    {
    }
}