import {ComponentRef, Directive, Inject, Input, Optional, SimpleChanges, Type, ViewContainerRef} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Logger, LOGGER} from '@anglr/common';
import {FormModelGroup} from '@anglr/common/forms';
import {DynamicItemSource} from '@anglr/dynamic';
import {nameof, resolvePromiseOr} from '@jscrpt/common';

import {PropertiesControl} from '../../../../interfaces';

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
     * Defines dynamic item source which properties are edited
     */
    @Input()
    public itemSource: DynamicItemSource|undefined;

    /**
     * Type that will be rendered
     */
    @Input('propertiesControl')
    public type: Type<PropertiesControl>|undefined;

    //######################### constructor #########################
    constructor(protected _viewContainerRef: ViewContainerRef,
                @Inject(LOGGER) @Optional() protected _logger?: Logger,)
    {
    }

    //######################### public methods - implementation of OnChanges #########################

    /**
     * Called when input value changes
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        this._logger?.debug('PropertiesControlRendererDirective: rendering properties control {@type}', {type: this.type?.name});

        this.ngOnDestroy();
        this._viewContainerRef.clear();

        // metadata are present
        if(nameof<PropertiesControlRendererDirective<TComponent, TOptions>>('type') in changes && this.type)
        {
            const injector = this._viewContainerRef.injector;

            this._componentRef = this._viewContainerRef.createComponent(this.type,
                                                                        {
                                                                            injector,
                                                                        }) as ComponentRef<TComponent>;

            if(this._componentRef)
            {
                const component = this._componentRef.instance;
                component.itemSource = this.itemSource;
                component.form = this.form;

                await resolvePromiseOr(component.initialize());
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
            this._logger?.debug('PropertiesControlRendererDirective: destroying properties control {@type}', {type: this.type?.name});
    
            this._componentRef?.destroy();
            this._componentRef = null;
        }
    }
}