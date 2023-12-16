import {ChangeDetectorRef, Directive, ElementRef, Injector, OnDestroy, SimpleChanges, inject} from '@angular/core';
import {Logger, LOGGER} from '@anglr/common';
import {DynamicItemExtension} from '@anglr/dynamic';
import {isEmptyObject, nameof, PromiseOr} from '@jscrpt/common';

import {LayoutComponent} from '../../interfaces';

/**
 * Base component for layout component
 */
@Directive()
export abstract class LayoutComponentBase<TOptions> implements LayoutComponent<TOptions>, OnDestroy
{
    //######################### protected fields #########################

    /**
     * Array of extensions that are registered for component
     */
    protected extensions: DynamicItemExtension<TOptions>[] = [];

    //TODO: check whether this is necessary

    /**
     * Indication whether was component destroyed
     */
    protected destroyed: boolean = false;

    /**
     * Gets options safely
     */
    protected get optionsSafe(): TOptions
    {
        if(!this.options)
        {
            throw new Error('LayoutComponentBase: missing options');
        }

        return this.options;
    }

    //######################### protected properties #########################

    /**
     * Gets element that is used within extension
     */
    protected get element(): ElementRef<HTMLElement>
    {
        return this.componentElement;
    }

    /**
     * Gets options that are used within extension
     */
    protected get extensionsOptions(): any|undefined|null
    {
        return this.options;
    }

    /**
     * Instance of change detector for running explicit change detection
     */
    protected changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

    /**
     * Instance of components element
     */
    protected componentElement: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);

    /**
     * Injector used for obtaining dependencies
     */
    protected injector: Injector = inject(Injector);

    /**
     * Instance of logger used for creating logs
     */
    protected logger: Logger = inject(LOGGER);

    //######################### public properties - implementation of LayoutComponent #########################

    /**
     * @inheritdoc
     */
    public options: TOptions|undefined|null;

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy(): void
    {
        this.logger.debug('LayoutComponentBase: destroying component, isDestroyed {{destroyed}}', {destroyed: this.destroyed});

        if(this.destroyed)
        {
            return;
        }

        this.destroyed = true;

        for(const ext of this.extensions)
        {
            ext.destroy();
        }

        this.onDestroy();
    }

    //######################### public methods - implementation of LayoutComponent #########################

    /**
     * @inheritdoc
     */
    public async ngOnInit(): Promise<void>
    {
        const extensionsOptions = this.extensionsOptions;
        
        await this.onInit();
        await this.onOptionsSet();

        if(extensionsOptions)
        {
            for(const extension of this.extensions)
            {
                await extension.initialize(this.injector, this.element, this);
            }
        }

        await this.afterInit();
    }

    /**
     * @inheritdoc
     */
    public async ngOnChanges(changes: SimpleChanges): Promise<void>
    {
        //options has changed
        if(nameof<LayoutComponentBase<TOptions>>('options') in changes)
        {
            //called only when options has changed
            if(!changes[nameof<LayoutComponentBase<TOptions>>('options')].firstChange)
            {
                await this.onOptionsSet();
            }

            const extensionsOptions = this.extensionsOptions;

            //set options in extensions
            if(extensionsOptions)
            {
                for(const extension of this.extensions)
                {
                    await extension.optionsChange(extensionsOptions);
                }
            }

            if(changes[nameof<LayoutComponentBase<TOptions>>('options')].firstChange)
            {
                return;
            }

            await this.onOptionsChange();
        }

        delete changes[nameof<LayoutComponentBase<TOptions>>('options')];

        if(!isEmptyObject(changes))
        {
            this.onChanges(changes);
        }
    }

    /**
     * @inheritdoc
     */
    public registerExtensions(extensions: DynamicItemExtension[]): void
    {
        this.extensions = extensions;
    }

    /**
     * @inheritdoc
     */
    public invalidateVisuals(): void
    {
        this.changeDetector.detectChanges();
    }

    //######################### protected methods #########################

    /**
     * Called on initialzation of component, options are already set
     */
    protected onInit(): PromiseOr<void>
    {
    }

    /**
     * Called right after initialization finished, including extesions
     */
    protected afterInit(): PromiseOr<void>
    {
    }

    /**
     * Called on change of options, after initialization
     */
    protected onOptionsChange(): PromiseOr<void>
    {
    }

    /**
     * Occurs when some property changes on component
     * @param changes - Changes that occured on component
     */
    protected onChanges(_changes: SimpleChanges): PromiseOr<void>
    {
    }

    /**
     * Called everytime options are set, after initialization and after each change (not initial change)
     */
    protected onOptionsSet(): PromiseOr<void>
    {
    }

    /**
     * Called when component is being destroyed
     */
    protected onDestroy(): void
    {
    }
}