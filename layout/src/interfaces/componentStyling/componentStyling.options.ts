import {Margin} from '../styles/margin.interface';
import {Padding} from '../styles/padding.interface';
import {TextStyling} from '../styles/textStyling.interface';

/**
 * Options that are used for styling component
 */
export interface ComponentStylingOptions
{
    //######################### properties #########################

    /**
     * Css class that should be applied to component
     */
    cssClass: string|undefined|null;

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