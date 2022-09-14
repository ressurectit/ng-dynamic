/**
 * Context passed to file template
 */
export interface FileTemplateContext
{
    /**
     * Instance of selected file or null if none is selected
     */
    $implicit: File|null;
}