import {Directive, HostListener} from '@angular/core';

/**
 * Directive that is used for displaying content options selection
 */
@Directive(
{
    selector: 'showContentOptionsSelection',
    standalone: true,
})
export class ShowContentOptionsSelectionSADirective
{
    //######################### protected methods - host #########################

    /**
     * Shows content options selection dialog
     * @param event - Event that occured
     */
    @HostListener('click', ['$event'])
    protected async show(event: MouseEvent): Promise<void>
    {
        event.preventDefault();
        event.stopPropagation();
    }
}