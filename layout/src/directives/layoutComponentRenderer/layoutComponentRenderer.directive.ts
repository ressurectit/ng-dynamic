import {Directive, Input, OnChanges, OnDestroy, Provider, SimpleChanges, ValueProvider, ViewContainerRef, inject} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemExtensionType, SCOPE_ID} from '@anglr/dynamic';
import {Action1, generateId, isBlank, isPresent, nameof} from '@jscrpt/common';

import {LayoutComponentMetadata} from '../../interfaces';
import {LAYOUT_COMPONENT_CHILD_EXTENSIONS} from '../../misc/tokens';
import {LayoutRenderer} from '../../services';

/**
 * Renders layout component from metadata using LayoutRenderer
 */
@Directive(
{
    selector: '[layoutComponentRenderer]',
    providers: 
    [
        <ValueProvider>
        {
            provide: LAYOUT_COMPONENT_CHILD_EXTENSIONS,
            useValue: null,
        },
        
    ],
    standalone: true
})
export class LayoutComponentRendererSADirective implements OnChanges, OnDestroy
{
    //######################### protected properties #########################

    /**
     * Id of this renderer directive
     */
    protected id: string = generateId(15);

    /**
     * Instance of view container used for rendering dynamic component at location of this directive
     */
    protected viewContainer: ViewContainerRef = inject(ViewContainerRef);

    /**
     * Instance of layout renderer that will perform rendering of component
     */
    protected renderer: LayoutRenderer = inject(LayoutRenderer);

    /**
     * Instance of parent directive or null if this is root directive
     */
    protected parentRendererDirective = inject(LayoutComponentRendererSADirective, {optional: true, skipSelf: true});

    /**
     * Instance of logger used for creating logs
     */
    protected logger: Logger = inject(LOGGER);

    /**
     * Id of scope for current component
     */
    protected scopeId: string|undefined|null = inject(SCOPE_ID, {optional: true});

    /**
     * Array of child extensions that can be applied to component from its parent
     */
    protected childExtensions: DynamicItemExtensionType[]|undefined|null = inject(LAYOUT_COMPONENT_CHILD_EXTENSIONS, {optional: true, skipSelf: true});

    //######################### public properties - inputs #########################

    /**
     * Type that should be dynamically created into current container
     */
    @Input('layoutComponentRenderer')
    public componentMetadata: LayoutComponentMetadata|undefined|null;

    /**
     * Callback method called when component has been rendered
     */
    @Input('layoutComponentRendererCallback')
    public renderedCallback: Action1<unknown>|undefined|null;

    /**
     * Array of extra providers to be provided
     */
    @Input('layoutComponentRendererProviders')
    public extraProviders: Provider[]|undefined|null;

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        if(nameof<LayoutComponentRendererSADirective>('componentMetadata') in changes)
        {
            const change = changes[nameof<LayoutComponentRendererSADirective>('componentMetadata')];

            //component added to renderer
            if(isPresent(change.currentValue) && isBlank(change.previousValue))
            {
                const metadata = change.currentValue as LayoutComponentMetadata;
                
                this.logger.debug('LayoutComponentRendererSADirective: registering component for rendering "{{id}}" inside renderer "{{rendererId}}" with parent renderer "{{parentRenderer}}" and parent component "{{parentComponent}}"',
                {
                    id: metadata.id,
                    rendererId: this.id,
                    parentRenderer: this.parentRendererDirective?.id,
                    parentComponent: this.parentRendererDirective?.componentMetadata?.id,
                });
    
                //registers renderer and component
                this.renderer.registerRenderer(this.id,
                                               this.parentRendererDirective?.id,
                                               this.viewContainer,
                                               metadata,
                                               this.parentRendererDirective?.componentMetadata,
                                               this.scopeId,
                                               this.childExtensions,
                                               this.renderedCallback,
                                               this.extraProviders,);
            }
            //component changed
            else if(isPresent(change.currentValue) && isPresent(change.previousValue))
            {
                this.logger.debug('LayoutComponentRendererSADirective: unregistering component from rendering "{{id}}"', {id: this.id});

                await this.renderer.unregisterRenderer(this.id);

                const metadata = change.currentValue as LayoutComponentMetadata;

                this.logger.debug('LayoutComponentRendererSADirective: registering component for rendering "{{id}}" inside renderer "{{rendererId}}" with parent renderer "{{parentRenderer}}" and parent component "{{parentComponent}}"',
                {
                    id: metadata.id,
                    rendererId: this.id,
                    parentRenderer: this.parentRendererDirective?.id,
                    parentComponent: this.parentRendererDirective?.componentMetadata?.id,
                });
    
                //registers renderer and component
                this.renderer.registerRenderer(this.id,
                                               this.parentRendererDirective?.id,
                                               this.viewContainer,
                                               metadata,
                                               this.parentRendererDirective?.componentMetadata,
                                               this.scopeId,
                                               this.childExtensions,
                                               this.renderedCallback,
                                               this.extraProviders,);
            }
            //component removed from renderer, unregister renderer
            else if(isBlank(change.currentValue) && isPresent(change.previousValue))
            {
                this.logger.debug('LayoutComponentRendererSADirective: unregistering component from rendering "{{id}}"', {id: this.id});

                await this.renderer.unregisterRenderer(this.id);
            }
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public async ngOnDestroy(): Promise<void>
    {
        this.logger.debug('LayoutComponentRendererSADirective: destroying renderer "{{id}}" with component "{{componentId}}"',
        {
            id: this.id,
            componentId: this.componentMetadata?.id,
        });

        await this.renderer.destroyRenderer(this.id);
    }
}