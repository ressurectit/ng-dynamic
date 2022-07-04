import {Directive, ElementRef, Input} from '@angular/core';
import {LayoutComponentMetadata} from '@anglr/dynamic/layout';

import {LayoutEditorMetadataExtractor} from '../../services';

//TODO: remove, do it more generic

/**
 * Copies designer styles that should be applied to element
 */
@Directive(
{
    selector: '[copyDesignerStyles]',
    exportAs: 'copyDesignerStyles',
    standalone: true
})
export class CopyDesignerStylesSADirective<TOptions = any>
{
    //######################### protected fields #########################

    /**
     * Designed component metadata
     */
    public _metadata: LayoutComponentMetadata<TOptions>|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Designed component metadata
     */
    @Input('copyDesignerStyles')
    public get metadata(): LayoutComponentMetadata<TOptions>|undefined|null
    {
        return this._metadata;
    }
    public set metadata(value: LayoutComponentMetadata<TOptions>|undefined|null)
    {
        this._metadata = value;

        this._copyDesignerStyles();
    }

    //######################### constructor #########################
    constructor(protected _element: ElementRef<HTMLElement>,
                protected _metadataExtractor: LayoutEditorMetadataExtractor,)
    {
    }

    //######################### protected methods #########################

    /**
     * Copies designer styles if necessary
     */
    protected async _copyDesignerStyles(): Promise<void>
    {
        if(!this._metadata)
        {
            return;
        }

        const metadata = await this._metadataExtractor.extractMetadata(this._metadata);
        const applyDesignerStyles = metadata?.applyDesignerStyles;

        if(applyDesignerStyles)
        {
            applyDesignerStyles(this._metadata.options, this._element.nativeElement.style);
        }
    }
}