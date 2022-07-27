import {Component, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Injector, Inject, Optional} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LayoutComponent, LayoutComponentBase, LayoutComponentRendererSADirective} from '@anglr/dynamic/layout';
import {LayoutEditorMetadata} from '@anglr/dynamic/layout-editor';
import {HostDisplayBlockStyle, Logger, LOGGER} from '@anglr/common';
import {generateId} from '@jscrpt/common';
import prefixer  from 'postcss-prefix-selector';
import postcss, {Processor, Root} from 'postcss';

import {StyleBlockComponentOptions} from './styleBlock.options';
import {StyleBlockLayoutMetadataLoader} from './styleBlock.metadata';

//TODO: optimize, debug, dual call of options set

/**
 * Component used for displaying style block
 */
@Component(
{
    selector: 'style-block',
    templateUrl: 'styleBlock.component.html',
    styles: [HostDisplayBlockStyle],
    host:
    {
        '[attr.id]': 'id'
    },
    standalone: true,
    imports:
    [
        LayoutComponentRendererSADirective,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@LayoutEditorMetadata(StyleBlockLayoutMetadataLoader)
export class StyleBlockSAComponent extends LayoutComponentBase<StyleBlockComponentOptions> implements LayoutComponent<StyleBlockComponentOptions>
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

    //######################### constructor #########################
    constructor(changeDetector: ChangeDetectorRef,
                element: ElementRef<HTMLElement>,
                injector: Injector,
                @Inject(DOCUMENT) protected document: Document,
                @Inject(LOGGER) @Optional() logger?: Logger,)
    {
        super(changeDetector, element, injector, logger);
    }

    //######################### protected methods - overrides #########################

    /**
     * @inheritdoc
     */
    protected override _onInit(): void
    {
        this.cssProcessor = postcss()
            .use((root: Root) =>
            {
                prefixer(
                {
                    prefix: `style-block#${this.id}`,
                })(root);
            });
    }

    /**
     * @inheritdoc
     */
    protected override _onOptionsSet(): void
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
    protected override _onDestroy(): void
    {
        this.style?.remove();
        this.style = null;
    }
}