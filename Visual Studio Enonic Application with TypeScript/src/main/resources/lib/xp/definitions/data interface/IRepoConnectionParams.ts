/**
 * Interfaced used to make repo connections
 */
interface INodeRepoConnectionParams {
    /**repository id*/
    repoId: any;

    /**branch id*/
    branch: any;

    /**User to execute the callback with. Default is the current user.*/
    user?: {
        /**Login of the user.*/
        login: string;
        /**User store containing the user. By default, all the user stores will be used.*/
        userStore?: string;
    }
    /**Additional principals to execute the callback with.*/
    principals?:Array<string>;
}