import {Margin, Padding, TextStyling} from '../../interfaces';

/**
 * Options that are used for styling component
 */
export interface ComponentStylingOptions
{
    //######################### properties #########################

    /**
     * Allows to set margin of component
     */
    margin: Margin|undefined|null;

    /**
     * Allows to set padding of component
     */
    padding: Padding|undefined|null;

    /**
     * Allows to set text styling of component
     */
    textStyling: TextStyling|undefined|null;
}