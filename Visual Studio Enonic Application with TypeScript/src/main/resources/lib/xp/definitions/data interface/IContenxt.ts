/**
 * A Context interface
 */
interface IContext {
    
    /**Name of the branch to execute the callback in. Default is the current branch set in portal.*/
    branch?: string;

    /**Repository to execute the callback in. Default is the current repository set in portal.*/
    repository?: string;

    /**...*/
    authInfo?: any;

    /**User to execute the callback with. Default is the current user.*/
    user?: {
        /**Login of the user.*/
        login: string;
        /**User store containing the user. By default, all the user stores will be used.*/
        userStore?: string;
    }

    /**Additional principals to execute the callback with.*/
    principals?: Array<IPrincipalBase>;

    /**Additional Context attributes.*/
    attributes?: any;
}