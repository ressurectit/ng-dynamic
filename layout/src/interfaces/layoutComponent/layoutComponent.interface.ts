import {AfterViewInit, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DynamicItem, DynamicItemExtension} from '@anglr/dynamic';
import {PromiseOr} from '@jscrpt/common';

/**
 * Description of layout component
 */
export interface LayoutComponent<TOptions = any> extends DynamicItem, Partial<OnInit>, Partial<OnChanges>, Partial<AfterViewInit>
{
    //######################### properties #########################

    /**
     * Options used for rendering this component
     */
    options: TOptions|undefined|null;

    //######################### methods #########################

    /**
     * Called on initialization of layout component
     */
    ngOnInit?(): PromiseOr<void>;

    /**
     * Called before initialization and every time some property changes
     * @param changes - Information about changes that occured
     */
    ngOnChanges?(changes: SimpleChanges): PromiseOr<void>;

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    ngAfterViewInit?(): PromiseOr<void>;

    /**
     * Registers extensions for component
     * @param extensions - Array of extensions that should be added to component
     */
    registerExtensions(extensions: DynamicItemExtension[]): void;
}