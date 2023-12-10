import {Directive, Input, OnChanges, OnDestroy, SimpleChanges, ValueProvider, ViewContainerRef, inject} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemExtensionType, SCOPE_ID} from '@anglr/dynamic';
import {generateId} from '@jscrpt/common';

import {LayoutComponentMetadata} from '../../interfaces';
import {LAYOUT_COMPONENT_CHILD_EXTENSIONS} from '../../misc/tokens';
import {LayoutRenderer} from '../../services';

/**
 * Renders layout component from metadata using LayoutRenderer
 */
@Directive(
{
    selector: '[layoutComponentRenderer2]',
    exportAs: 'layoutComponentRenderer2',
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
export class LayoutComponentRenderer2SADirective<TComponentOptions = unknown> implements OnChanges, OnDestroy
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
    protected parentRendererDirective = inject(LayoutComponentRenderer2SADirective, {optional: true, skipSelf: true});

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
    @Input('layoutComponentRenderer2')
    public componentMetadata: LayoutComponentMetadata<TComponentOptions>|undefined|null;

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public ngOnChanges(_: SimpleChanges): void
    {
        if(this.componentMetadata)
        {
            this.logger.debug('LayoutComponentRenderer2SADirective: registering component for rendering "{{id}}" inside renderer "{{rendererId}}" with parent renderer "{{parentRenderer}}" and parent component "{{parentComponent}}"',
            {
                id: this.componentMetadata.id,
                rendererId: this.id,
                parentRenderer: this.parentRendererDirective?.id,
                parentComponent: this.parentRendererDirective?.componentMetadata?.id,
            });

            //registers renderer and component
            this.renderer.registerRenderer(this.id,
                                           this.parentRendererDirective?.id,
                                           this.viewContainer,
                                           this.componentMetadata,
                                           this.parentRendererDirective?.componentMetadata,
                                           this.scopeId,
                                           this.childExtensions,
                                           undefined,);
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.logger.debug('LayoutComponentRenderer2SADirective: destroying renderer "{{id}}" with component "{{componentId}}"',
        {
            id: this.id,
            componentId: this.componentMetadata?.id,
        });

        this.renderer.destroyRenderer(this.id);
    }
}