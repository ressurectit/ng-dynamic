import {ComponentStylingExtension} from '@anglr/dynamic/layout';
import {RelationsRegistrationExtension} from '@anglr/dynamic/relations';

import {ListBlockDataExtension} from './extensions';
import {ListBlockSAComponent} from './listBlock.component';

export default ListBlockSAComponent;

export const extensions = [ComponentStylingExtension, RelationsRegistrationExtension, ListBlockDataExtension];