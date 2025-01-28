import {RelationsRegistrationExtension} from '@anglr/dynamic/relations';
import {ComponentStylingExtension} from '@anglr/dynamic/layout';

import {HtmlBlockComponent} from './htmlBlock.component';

export default HtmlBlockComponent;

export const extensions = [RelationsRegistrationExtension, ComponentStylingExtension];