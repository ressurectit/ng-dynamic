import {TextFontWeight} from '../../types';

/**
 * Description of text styling styles
 */
export interface TextStyling
{
    //######################### properties #########################

    /**
     * Font size of displayed text
     */
    fontSize?: string;

    /**
     * Font weight of displayed text
     */
    fontWeight?: TextFontWeight;
}