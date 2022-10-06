// import {RelationsRegistrationExtension} from '@anglr/dynamic/relations';
import {ComponentStylingExtension} from '@anglr/dynamic/layout';

import {IdSetterExtension} from '../../misc/extensions';
import {CustomComponentSAComponent} from './customComponent.component';
import {CustomComponentDataExtension} from './extensions';

export default CustomComponentSAComponent;

export const extensions = [ComponentStylingExtension, CustomComponentDataExtension, IdSetterExtension];