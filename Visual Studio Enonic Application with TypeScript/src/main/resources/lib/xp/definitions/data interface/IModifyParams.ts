/**
 * Input parameters for modify
 */
interface IModifyParams {
    /**Path or id to the content.*/
    key: string;

    /**Editor callback function.*/
    editor: any;

    /**Set by portal, depending on context, to either draft or master.May be overridden, but this is not recommended.Default is the current branch set in portal.*/
    branch?: string;

    /**The content has to be valid, according to the content type, to be updated.If requireValid= true and the content is not strictly valid, an error will be thrown.*/
    requireValid?: boolean;
}