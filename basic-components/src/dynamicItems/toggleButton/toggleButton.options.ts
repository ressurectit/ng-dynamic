/**
 * Options for toggle button component
 */
export interface ToggleButtonComponentOptions
{
    //######################### properties #########################

    /**
     * Text to be displayed in toggle button when button is on
     */
    onText: string|undefined|null;

    /**
     * Text to be displayed in toggle button when button is off
     */
    offText: string|undefined|null;

    /**
     * State of button on or off
     */
    state: boolean|undefined|null;

    /**
     * Indication whether is toggle button disabled
     */
    disabled: boolean|undefined|null;

    /**
     * Css class applied to button element itself
     */
    buttonCssClass: string|undefined|null;
}