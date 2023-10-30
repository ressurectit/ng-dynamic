import {ComponentRef, Directive, Inject, Input, Optional, Type, ViewContainerRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Logger, LOGGER} from '@anglr/common';
import {Dictionary} from '@jscrpt/common';

import {PropertyTypeControl} from '../../../../interfaces';
import {LAYOUT_EDITOR_PROPERTY_TYPE_CONTROLS} from '../../../../misc/tokens';

/**
 * Directive used for rendering property type control
 */
@Directive(
{
    selector: '[propertyTypeControl]'
})
export class PropertyTypeControlRendererDirective<TComponent extends PropertyTypeControl<TValue> = any, TValue = any>
{
    //######################### protected fields #########################

    /**
     * Created component reference
     */
    protected _componentRef: ComponentRef<TComponent>|null = null;

    //######################### public properties - inputs #########################

    /**
     * Form control that will handle value of property
     */
    @Input()
    public control: FormControl<TValue>|undefined;

    /**
     * Metadata for displaying property control
     */
    @Input('propertyTypeControl')
    public typeName: string|undefined;

    /**
     * Array of available values
     */
    @Input()
    public values: TValue[] = [];

    //######################### constructor #########################
    constructor(protected _viewContainerRef: ViewContainerRef,
                @Inject(LAYOUT_EDITOR_PROPERTY_TYPE_CONTROLS) protected _typeControls: Dictionary<Type<PropertyTypeControl>>,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(): Promise<void>
    {
        const typeName = this.typeName ?? 'inputString';
        this._logger?.debug('PropertyTypeControlRendererDirective: rendering property type control {{@type}}', {type: typeName});

        this.ngOnDestroy();
        this._viewContainerRef.clear();

        // metadata are present
        if(this.typeName)
        {
            const injector = this._viewContainerRef.injector;
            const type = this._typeControls[typeName];

            if(!type)
            {
                this._logger?.error('PropertyTypeControlRendererDirective: unable to find property type control {{@type}}', {type: typeName});

                throw new Error(`unable to find property type control ${typeName}`);
            }

            this._componentRef = this._viewContainerRef.createComponent(type,
                                                                        {
                                                                            injector,
                                                                        }) as ComponentRef<TComponent>;

            if(this._componentRef)
            {
                const component = this._componentRef.instance;
                component.control = this.control;
                component.values = this.values;

                await component.initialize();
                component.invalidateVisuals();
            }
        }
    }

    //######################### public methods - implementation of OnDestroy #########################

    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        if(this._componentRef)
        {
            this._logger?.debug('PropertyTypeControlRendererDirective: destroying property type control {{@type}}', {type: this.typeName ?? 'inputString'});
    
            this._componentRef?.destroy();
            this._componentRef = null;
        }
    }
}