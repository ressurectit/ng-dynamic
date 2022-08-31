import {Component, ChangeDetectionStrategy, Input, SimpleChanges} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {RelationsComponent} from '@anglr/dynamic/relations';
import {RelationsEditorMetadata} from '@anglr/dynamic/relations-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {nameof} from '@jscrpt/common';

import {HtmlBlockComponentOptions} from './htmlBlock.options';
import {HtmlBlockLayoutMetadataLoader, HtmlBlockRelationsMetadataLoader} from './htmlBlock.metadata';

/**
 * Component used for displaying html block
 */
@Component(
{
    selector: 'html-block',
    template: '',
    styles: [HostDisplayBlockStyle],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@RelationsEditorMetadata(HtmlBlockRelationsMetadataLoader)
@LayoutEditorMetadata(HtmlBlockLayoutMetadataLoader)
export class HtmlBlockSAComponent extends LayoutComponentBase<HtmlBlockComponentOptions> implements LayoutComponent<HtmlBlockComponentOptions>, RelationsComponent
{
    //######################### public properties - implementation of RelationsComponent #########################

    /**
     * @inheritdoc
     */
    public relationsOptions: any;

    //######################### public properties - inputs #########################

    /**
     * Html content to be displayed inside block
     */
    @Input()
    public content: string|undefined|null;

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * @inheritdoc
     */
    public override async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        await super.ngOnChanges(changes);

        if(nameof<HtmlBlockSAComponent>('content') in changes)
        {
            this._element.nativeElement.innerHTML = this.content ?? '';
        }
    }

    //######################### protected - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        if(!this.initialized)
        {
            return;
        }

        if(this.options?.content)
        {
            this.content = this.options.content;
            this._element.nativeElement.innerHTML = this.content ?? '';
        }
    }
}