import {ComponentRef, Directive, EmbeddedViewRef, HostListener, Inject, Injector, Input, OnDestroy, ViewContainerRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Position, POSITION} from '@anglr/common';

import {RelationsDebuggerVisualizerSAComponent} from '../../components';

/**
 * Directive that shows relations debugger
 */
@Directive(
{
    selector: '[showRelationsDebugger]',
    standalone: true,
})
export class ShowRelationsDebuggerSADirective implements OnDestroy
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

    //######################### constructor #########################
    constructor(@Inject(POSITION) protected position: Position,
                protected viewContainer: ViewContainerRef,
                protected injector: Injector,
                @Inject(DOCUMENT) protected document: Document, )
    {
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
            const element = (this.visualizer.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;

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
                }

                element.appendChild(element);
            }
            //render directly to body
            else
            {
                this.document.body.appendChild(element);
            }

            this.visualizer.instance.close.subscribe(() => this.ngOnDestroy());
        }
    }
}