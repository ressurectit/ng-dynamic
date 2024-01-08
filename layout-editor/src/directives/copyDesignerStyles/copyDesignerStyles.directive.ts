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
    public ɵmetadata: LayoutComponentMetadata<TOptions>|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Designed component metadata
     */
    @Input('copyDesignerStyles')
    public get metadata(): LayoutComponentMetadata<TOptions>|undefined|null
    {
        return this.ɵmetadata;
    }
    public set metadata(value: LayoutComponentMetadata<TOptions>|undefined|null)
    {
        this.ɵmetadata = value;

        this.copyDesignerStyles();
    }

    //######################### constructor #########################
    constructor(protected element: ElementRef<HTMLElement>,
                protected metadataExtractor: LayoutEditorMetadataExtractor,)
    {
    }

    //######################### protected methods #########################

    /**
     * Copies designer styles if necessary
     */
    protected async copyDesignerStyles(): Promise<void>
    {
        if(!this.ɵmetadata)
        {
            return;
        }

        const metadata = await this.metadataExtractor.extractMetadata(this.ɵmetadata);
        const applyDesignerStyles = metadata?.applyDesignerStyles;

        if(applyDesignerStyles)
        {
            applyDesignerStyles(this.ɵmetadata.options, this.element.nativeElement.style);
        }
    }
}