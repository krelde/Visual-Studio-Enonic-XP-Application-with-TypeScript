/**
 * Input parameters for content query
 */
interface IQueryParams {

    /** Start index (used for paging).*/
    start?: number;

    /** Number of contents to fetch.*/
    count?: number;

    /** Query expression.*/
    query: string;

    /** Sorting expression.*/
    sort?: string;

    /** Aggregations expression.*/
    aggregations?: string;

    /** Content types to filter on.*/
    contentTypes?: Array<string>;

    /**Set by portal, depending on context, to either draft or master. May be overridden, but this is not recommended. Default is the current branch set in portal.  */
    branch?: string;
}