import {Directive, ElementRef, ExistingProvider, forwardRef, HostListener, inject, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Action1, NoopAction} from '@jscrpt/common';

import {ColumnDefinition} from '../../../interfaces';

/**
 * Column definition control value accessor
 */
@Directive(
{
    selector: 'input[formControl][columnDefinition]',
    providers:
    [
        <ExistingProvider>
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ColumnDefinitionFormValueAccessorDirective),
            multi: true,
        }
    ],
})
export class ColumnDefinitionFormValueAccessorDirective implements ControlValueAccessor
{
    //######################### private fields #########################

    /**
     * Callback used for changing value of control
     */
    private _onChange: Action1<string>|undefined|null;

    /**
     * Callback used for handling on touch event
     */
    private _onTouch: NoopAction|undefined|null;

    /**
     * Instance of element attached to directive
     */
    private _element: ElementRef<HTMLInputElement> = inject(ElementRef<HTMLInputElement>);

    /**
     * Instance of renderer
     */
    private _renderer: Renderer2 = inject(Renderer2);

    //######################### public methods - implements ControlValueAccessor #########################

    /**
     * @inheritdoc
     */
    public writeValue(value: ColumnDefinition): void
    {
        this._renderer.setProperty(this._element.nativeElement, 'value', value.width);
    }

    /**
     * @inheritdoc
     */
    public registerOnChange(fn: Action1<ColumnDefinition>): void
    {
        this._onChange = value => fn({width: value});
    }

    /**
     * @inheritdoc
     */
    public registerOnTouched(fn: NoopAction): void
    {
        this._onTouch = fn;
    }

    //######################### protected methods - host #########################

    /**
     * Event handler for input events
     */
    @HostListener('input', ['$event.target.value'])
    protected inputEventHandler(value: string): void
    {
        this._onChange?.(value);
    }

    /**
     * Event handler for focus events
     */
    @HostListener('focus')
    protected focusEventHandler(): void
    {
        this._onTouch?.();
    }
}