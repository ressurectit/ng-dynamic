import {RelationsRegistrationExtension} from '@anglr/dynamic/relations';
import {ComponentStylingExtension} from '@anglr/dynamic/layout';

import {HtmlBlockSAComponent} from './htmlBlock.component';

export default HtmlBlockSAComponent;

export const extensions = [RelationsRegistrationExtension, ComponentStylingExtension];