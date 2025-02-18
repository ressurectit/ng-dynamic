import {Component, ChangeDetectionStrategy, inject, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererDirective} from '@anglr/dynamic/layout';
import {DescendantsGetter, LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle} from '@anglr/common';
import {generateId} from '@jscrpt/common';
import prefixer  from 'postcss-prefix-selector';
import postcss, {Processor, Root} from 'postcss';

import {StyleBlockComponentOptions} from './styleBlock.options';
import {StyleBlockLayoutMetadataLoader} from './styleBlock.metadata';

/**
 * Component used for displaying style block
 */
@Component(
{
    selector: 'style-block',
    templateUrl: 'styleBlock.component.html',
    styles: [HostDisplayBlockStyle],
    imports:
    [
        LayoutComponentRendererDirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@DescendantsGetter<StyleBlockComponentOptions>(options => options?.content ? [options?.content] : [])
@LayoutEditorMetadata(StyleBlockLayoutMetadataLoader)
export class StyleBlockComponent extends LayoutComponentBase<StyleBlockComponentOptions> implements LayoutComponent<StyleBlockComponentOptions>
{
    //######################### protected properties #########################

    /**
     * Unique ID for this instance of style block
     */
    protected id: string = generateId(10);

    /**
     * Instance of created style element by this style block
     */
    protected style: HTMLStyleElement|undefined|null;

    /**
     * Instance of css processor that applies changes
     */
    protected cssProcessor: Processor|undefined|null;

    /**
     * Instance of html document
     */
    protected document: Document = inject(DOCUMENT);

    /**
     * Instance of renderer for html modifications
     */
    protected renderer: Renderer2 = inject(Renderer2);

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override onInit(): void
    {
        this.renderer.setAttribute(this.element.nativeElement, 'id', this.id);

        //TODO: check
        this.cssProcessor = postcss()
            .use((root: Root) =>
            {
                prefixer(
                {
                    prefix: `style-block#${this.id}`,
                })(root as any);
                //TODO check postcss and remove any
            });
    }

    /**
     * @inheritdoc
     */
    protected override onOptionsSet(): void
    {
        if(this.options?.style && this.cssProcessor)
        {
            const css = this.cssProcessor.process(this.options.style).css;

            this.style = this.document.createElement('style');
            this.style.innerText = css;

            this.document.head.append(this.style);
        }
    }

    /**
     * @inheritdoc
     */
    protected override onDestroy(): void
    {
        this.style?.remove();
        this.style = null;
    }
}