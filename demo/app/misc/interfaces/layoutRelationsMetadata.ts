import {LayoutComponentMetadata} from '@anglr/dynamic/layout';
import {RelationsNodeMetadata} from '@anglr/dynamic/relations-editor';

export interface LayoutRelationsMetadata
{
    layout?: LayoutComponentMetadata;
    
    relations?: RelationsNodeMetadata[];
}