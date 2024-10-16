import {OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormModelGroup} from '@anglr/common/forms';
import {Dictionary, PromiseOr} from '@jscrpt/common';

import {LayoutEditorPropertyMetadata} from '../../misc/types';
import {LayoutPropertyTypeData} from '../../decorators';

//TODO: also rework for ngOnInit
//TODO: allow specifying usedProperties, to filter out some properties

/**
 * Defines control that will handle displaying of properties/options of component
 */
export interface PropertiesControl<TOptions = any> extends OnInit
{
    /**
     * Form group representing whole options
     */
    form: FormGroup<FormModelGroup<TOptions>>|undefined;

    /**
     * All current options for componet
     */
    options: TOptions|undefined|null;

    /**
     * Properties metadata that are being rendered
     */
    propertiesMetadata: Dictionary<LayoutEditorPropertyMetadata&LayoutPropertyTypeData>|null;

    /**
     * Initialize component
     */
    initialize(): PromiseOr<void>;

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}