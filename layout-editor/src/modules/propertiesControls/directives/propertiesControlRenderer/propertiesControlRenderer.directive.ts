import {ComponentRef, Directive, Inject, Input, Optional, Type, ViewContainerRef} from '@angular/core';
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
    selector: '[propertiesControl]'
})
export class PropertiesControlRendererDirective<TComponent extends PropertiesControl<TOptions> = any, TOptions = any>
{
    //######################### protected fields #########################

    /**
     * Created component reference
     */
    protected _componentRef: ComponentRef<TComponent>|null = null;

    //######################### public properties - inputs #########################

    /**
     * Form group representing whole options
     */
    @Input()
    public form: FormGroup<FormModelGroup<TOptions>>|undefined;

    /**
     * Properties metadata that are being rendered
     */
    @Input()
    public propertiesMetadata: Dictionary<LayoutEditorPropertyMetadata&LayoutPropertyTypeData>|null = null;

    /**
     * Type that will be rendered
     */
    @Input('propertiesControl')
    public type: Type<PropertiesControl>|undefined;

    /**
     * Instance of all options available for component (not only edited one)
     */
    @Input()
    public options: TOptions|undefined|null;

    //######################### constructor #########################
    constructor(protected _viewContainerRef: ViewContainerRef,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(): Promise<void>
    {
        this._logger?.debug('PropertiesControlRendererDirective: rendering properties control {{@type}}', {type: this.type?.name});

        this.ngOnDestroy();
        this._viewContainerRef.clear();

        // metadata are present
        if(this.type)
        {
            const injector = this._viewContainerRef.injector;

            this._componentRef = this._viewContainerRef.createComponent(this.type,
                                                                        {
                                                                            injector,
                                                                        }) as ComponentRef<TComponent>;

            if(this._componentRef)
            {
                const component = this._componentRef.instance;
                component.propertiesMetadata = this.propertiesMetadata;
                component.form = this.form;
                component.options = this.options;

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
            this._logger?.debug('PropertiesControlRendererDirective: destroying properties control {{@type}}', {type: this.type?.name});
    
            this._componentRef?.destroy();
            this._componentRef = null;
        }
    }
}