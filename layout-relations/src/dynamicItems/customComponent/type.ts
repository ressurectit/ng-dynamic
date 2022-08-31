// import {RelationsRegistrationExtension} from '@anglr/dynamic/relations';
import {ComponentStylingExtension} from '@anglr/dynamic/layout';

import {CustomComponentSAComponent} from './customComponent.component';
import {CustomComponentDataExtension} from './extensions';

export default CustomComponentSAComponent;

export const extensions = [ComponentStylingExtension, CustomComponentDataExtension];