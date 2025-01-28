import {ComponentRef, Directive, effect, Inject, input, InputSignal, Optional, Type, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Logger, LOGGER} from '@anglr/common';
import {FormModelGroup} from '@anglr/common/forms';
import {Dictionary} from '@jscrpt/common';

import {PropertiesControl} from '../../../../interfaces';
import {LayoutEditorPropertyMetadata} from '../../../../misc/types';
import {LayoutPropertyTypeData} from '../../../../decorators';

/**
 * Directive used for rendering properties control
 */
@Directive(
{
    selector: '[propertiesControl]',
})
export class PropertiesControlRendererDirective<TOptions = unknown, TComponent extends PropertiesControl<TOptions> = PropertiesControl<TOptions>>
{
    //######################### protected fields #########################

    /**
     * Created component reference
     */
    protected componentRef: ComponentRef<TComponent>|null = null;

    //######################### public properties - inputs #########################

    /**
     * Form group representing whole options
     */
    public form: InputSignal<FormGroup<FormModelGroup<TOptions>>|undefined|null> = input.required();

    /**
     * Properties metadata that are being rendered
     */
    public propertiesMetadata: InputSignal<Dictionary<LayoutEditorPropertyMetadata&LayoutPropertyTypeData>|undefined|null> = input.required();

    /**
     * Type that will be rendered
     */
    public type: InputSignal<Type<PropertiesControl>|undefined|null> = input.required({alias: 'propertiesControl'});

    /**
     * Instance of all options available for component (not only edited one)
     */
    public options: InputSignal<TOptions|undefined|null> = input();

    //######################### constructor #########################
    constructor(protected viewContainerRef: ViewContainerRef,
                @Inject(LOGGER) @Optional() protected logger?: Logger,)
    {
        effect(async () =>
        {
            const type = this.type();
            this.logger?.debug('PropertiesControlRendererDirective: rendering properties control {{@type}}', {type: type?.name});

            if(this.componentRef?.componentType !== type)
            {
                this.ngOnDestroy();
                this.viewContainerRef.clear();
            }
    
            // metadata are present
            if(type)
            {
                if(this.componentRef?.componentType !== type)
                {
                    const injector = this.viewContainerRef.injector;
        
                    this.componentRef = this.viewContainerRef.createComponent(type,
                                                                              {
                                                                                  injector,
                                                                              }) as ComponentRef<TComponent>;
                }
    
                const component = this.componentRef.instance;
                component.propertiesMetadata = this.propertiesMetadata();
                component.form = this.form();
                component.options = this.options();

                await component.initialize();
                component.invalidateVisuals();
            }
        });
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this.componentRef)
        {
            this.logger?.debug('PropertiesControlRendererDirective: destroying properties control {{@type}}', {type: this.type()?.name});
    
            this.componentRef?.destroy();
            this.componentRef = null;
        }
    }
}