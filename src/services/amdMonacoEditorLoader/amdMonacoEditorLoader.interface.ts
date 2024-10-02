import type {Emitter, MarkerTag, MarkerSeverity, CancellationTokenSource, Uri, KeyCode, KeyMod, Position, Range, Selection, SelectionDirection, Token, editor, languages} from 'monaco-editor';

/**
 * Type that represents monaco editor
 */
export interface MonacoEditorType
{
    Emitter: typeof Emitter<unknown>;
    MarkerTag: typeof MarkerTag;
    MarkerSeverity: typeof MarkerSeverity;
    CancellationTokenSource: typeof CancellationTokenSource;
    Uri: typeof Uri;
    KeyCode: typeof KeyCode;
    KeyMod: typeof KeyMod;
    Position: typeof Position;
    Range: typeof Range;
    Selection: typeof Selection;
    SelectionDirection: typeof SelectionDirection;
    Token: typeof Token;
    editor: typeof editor;
    languages: typeof languages;
}
