import {Injectable} from '@angular/core';

import {CustomComponentConfiguration} from './customComponentsRegister.interface';
import {CustomDynamicItemsRegister} from '../customDynamicItemsRegister/customDynamicItemsRegister.service';

/**
 * Register that contains registered custom components
 */
@Injectable()
export class CustomComponentsRegister<TConfig extends CustomComponentConfiguration = CustomComponentConfiguration> extends CustomDynamicItemsRegister<TConfig>
{
}
