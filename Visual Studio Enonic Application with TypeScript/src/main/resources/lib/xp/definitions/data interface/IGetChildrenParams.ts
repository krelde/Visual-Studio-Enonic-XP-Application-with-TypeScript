/**
 * Input parameters for getChildren
 */
interface IGetChildrenParams {
    /**Path or id to the parent content.*/
    key: string;

    /**Start index (used for paging).*/
    start?: number;

    /**Number of contents to fetch.*/
    count?: number;

    /**Sorting expression.*/
    sort?: string;

    /**Set by portal, depending on context, to either draft or master. May be overridden, but this is not recommended. Default is the current branch set in portal.*/
    branch?:string,
}
