import {OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormModelGroup} from '@anglr/common/forms';
import {DynamicItemSource} from '@anglr/dynamic';
import {PromiseOr} from '@jscrpt/common';

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
     * Defines dynamic item source which properties are edited
     */
    itemSource: DynamicItemSource|undefined;

    /**
     * Initialize component
     */
    initialize(): PromiseOr<void>;

    /**
     * Explicitly runs invalidation of content (change detection)
     */
    invalidateVisuals(): void;
}