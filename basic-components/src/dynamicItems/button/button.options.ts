/**
 * Available types of button
 */
export type ButtonType = 'button'|'submit';

/**
 * Options for button component
 */
export interface ButtonComponentOptions
{
    //######################### properties #########################

    /**
     * Text to be displayed in button
     */
    text: string|undefined|null;

    /**
     * Css class used for displaying FA 'icon'
     */
    icon: string|undefined|null;

    /**
     * Indication whether is button disabled
     */
    disabled: boolean|undefined|null;

    /**
     * Css class applied to button element itself
     */
    buttonCssClass: string|undefined|null;

    /**
     * Tooltip that is displayed over button
     */
    tooltip: string|undefined|null;

    /**
     * Type of button
     */
    type: ButtonType;
}

/**
 * Options for button component relations
 */
export interface ButtonComponentRelationsOptions
{
}