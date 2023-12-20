import {Injectable} from '@angular/core';

import {CustomRelationsConfiguration} from './customRelationsRegister.interface';
import {CustomDynamicItemsRegister} from '../customDynamicItemsRegister/customDynamicItemsRegister.service';

/**
 * Register that contains registered custom relations
 */
@Injectable()
export class CustomRelationsRegister<TConfig extends CustomRelationsConfiguration = CustomRelationsConfiguration> extends CustomDynamicItemsRegister<TConfig>
{
}
