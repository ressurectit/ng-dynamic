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
    fontSize: string|undefined|null;

    /**
     * Font weight of displayed text
     */
    fontWeight: TextFontWeight|undefined|null;
}