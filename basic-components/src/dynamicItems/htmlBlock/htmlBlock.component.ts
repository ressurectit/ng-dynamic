import {Component, ChangeDetectionStrategy, Input, SimpleChanges} from '@angular/core';
import {LayoutComponent, LayoutComponentBase} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {DebugData, RelationsComponent} from '@anglr/dynamic/relations';
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DebugData(
{
    inputs:
    [
        nameof<HtmlBlockComponent>('content'),
    ],
})
@RelationsEditorMetadata(HtmlBlockRelationsMetadataLoader)
@LayoutEditorMetadata(HtmlBlockLayoutMetadataLoader)
export class HtmlBlockComponent extends LayoutComponentBase<HtmlBlockComponentOptions> implements LayoutComponent<HtmlBlockComponentOptions>, RelationsComponent
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
    public override async dynamicOnChanges(changes: SimpleChanges): Promise<void>
    {
        await super.dynamicOnChanges(changes);

        if(nameof<HtmlBlockComponent>('content') in changes)
        {
            this.componentElement.nativeElement.innerHTML = this.content ?? '';
        }
    }

    //######################### protected - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        //TODO: check if required
        // if(!this.initialized)
        // {
        //     return;
        // }

        if(this.options?.content)
        {
            this.content = this.options.content;
            this.componentElement.nativeElement.innerHTML = this.content ?? '';
        }
    }
}