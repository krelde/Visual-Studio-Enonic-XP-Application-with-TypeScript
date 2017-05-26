/**
 * Input parameters for modify
 */
interface IPublishParams {
    /**List of all content keys(path or id) that should be published.*/
    keys: Array<string>;
    /**The branch where the content to be published is stored.*/
    sourceBranch: string;
    /**The branch to which the content should be published. Technically, publishing is just a move from one branch to another, and publishing user content from master to draft is therefore also valid usage of this function, which may be practical if user input to a web-page is stored on master.*/
    targetBranch: string;
    /**Schedule the publish.*/
    schedule: { from?: string, to?: string };
    /**Whether all children should be included when publishing content.*/
    includeChildren?: boolean;
    /**Whether all related content should be included when publishing content.*/
    includeDependencies?:boolean;
}