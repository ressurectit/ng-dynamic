import {ComponentRef, Directive, EmbeddedViewRef, HostListener, Inject, Injector, Input, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Position, POSITION} from '@anglr/common';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';
import {nameof} from '@jscrpt/common';

import {RelationsDebuggerVisualizerSAComponent} from '../../components';

/**
 * Directive that shows relations debugger
 */
@Directive(
{
    selector: '[showRelationsDebugger]',
})
export class ShowRelationsDebuggerSADirective implements OnDestroy, OnChanges
{
    //######################### protected properties #########################

    /**
     * Instance of reference to created visualizer
     */
    protected visualizer: ComponentRef<RelationsDebuggerVisualizerSAComponent>|undefined|null;

    //######################### public properties - inputs #########################

    /**
     * Name of element and optionaly css classes to be used as container, if not specified body is used
     */
    @Input()
    public containerElement: string|undefined|null;

    /**
     * Definition of relations and their nodes, used for rendering canvas
     */
    @Input()
    public relationsDefinition: RelationsNodeMetadata[] = [];

    //######################### public properties - inputs #########################

    /**
     * Delay between steps during automatic play
     */
    @Input()
    public playDelay: number = 1500;

    //######################### constructor #########################
    constructor(@Inject(POSITION) protected position: Position,
                protected viewContainer: ViewContainerRef,
                protected injector: Injector,
                @Inject(DOCUMENT) protected document: Document, )
    {
    }

    //######################### public methods - implementation of OnChanges #########################
    
    /**
     * Called when input value changes
     */
    public ngOnChanges(changes: SimpleChanges): void
    {
        if(nameof<ShowRelationsDebuggerSADirective>('playDelay') in changes)
        {
            if(this.visualizer)
            {
                this.visualizer.setInput(nameof<RelationsDebuggerVisualizerSAComponent>('playDelay'), this.playDelay);
            }
        }

        if(nameof<ShowRelationsDebuggerSADirective>('relationsDefinition') in changes)
        {
            if(this.visualizer)
            {
                this.visualizer.setInput(nameof<RelationsDebuggerVisualizerSAComponent>('relationsDefinition'), this.relationsDefinition);
            }
        }

        if(this.visualizer)
        {
            this.visualizer.changeDetectorRef.detectChanges();
        }
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.visualizer?.destroy();
        this.visualizer = null;
    }

    //######################### public methods - host #########################

    /**
     * Shows relations debugger
     * @param event - Event that occured
     */
    @HostListener('click', ['$event'])
    public show(event: MouseEvent): void
    {
        event.preventDefault();
        event.stopPropagation();

        if(ngRelationsDebugger)
        {
            this.visualizer = this.viewContainer.createComponent(RelationsDebuggerVisualizerSAComponent);
            const visualizerElement = (this.visualizer.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;

            //render to specified target element
            if(this.containerElement)
            {
                let element = this.document.querySelector(`body ${this.containerElement}`);

                //element does not exists
                if(!element)
                {
                    const [name, ...css] = this.containerElement.split('.');

                    element = this.document.createElement(name);

                    if(css?.length)
                    {
                        for(const cssClass of css)
                        {
                            element.classList.add(cssClass);
                        }
                    }

                    this.document.body.appendChild(element);
                }

                element.appendChild(visualizerElement);
            }
            //render directly to body
            else
            {
                this.document.body.appendChild(visualizerElement);
            }

            this.visualizer.instance.close.subscribe(() => this.ngOnDestroy());
            this.visualizer.setInput(nameof<RelationsDebuggerVisualizerSAComponent>('playDelay'), this.playDelay);
            this.visualizer.setInput(nameof<RelationsDebuggerVisualizerSAComponent>('relationsDefinition'), this.relationsDefinition);

            this.visualizer.changeDetectorRef.markForCheck();
        }
    }
}