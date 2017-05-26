/**
 * Interface used to params for making a repo connection
 */
interface ICreateRepoParams {
    /**Repository ID.*/
    id: string;

    /**Array of root permissions. By default, all permissions to 'system.admin' and read permission to 'system.authenticated'*/
    rootPermissions?: Array<any>;

    /**Root child order.*/
    rootChildOrder?: string;

    /**Repository settings.*/
    settings?: {

        /**Index definitions.*/
        definitions?: {
            /**Search index definition.*/
            search?: any;
            /**Version index definition.*/
            version?: any;
            /**Branch indexes definition.*/
            branch?: any;
        }
    }
}