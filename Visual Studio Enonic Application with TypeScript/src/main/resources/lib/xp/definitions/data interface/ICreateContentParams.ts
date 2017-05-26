/**
* Create content input parameters
*/
interface ICreateContentParams {

    /** Name of content*/
    name?: string;

    /**Path to place content under.*/
    parentPath: string;

    /**Display name.Default is same as name.*/
    displayName?: string;

    /**The content has to be valid, according to the content type, to be created. If requireValid=true and the content is not strictly valid, an error will be thrown.*/
    requireValid?: boolean;

    /**If refresh is true, the created content will to be searchable through queries immediately, else within 1 second. Since there is a performance penalty doing this refresh, refresh should be set to false for bulk operations.*/
    refresh?: boolean;

    /**Content type to use.*/
    contentType: string;

    /**The language tag representing the content’s locale.*/
    language?: string;

    /**Set by portal, depending on context, to either draft or master. May be overridden, but this is not recommended. Default is the current branch set in portal.*/
    branch?: string;

    /**Actual content data.*/
    data: any;

    /**    eXtra data to use.*/
    x?: any;
}