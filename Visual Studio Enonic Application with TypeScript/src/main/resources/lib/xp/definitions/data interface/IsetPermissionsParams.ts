/**
 * Input parameters for setting permissions
 */
interface ISetPermissionsParams {
    /**Path or id of the content.*/
    key: string;

    /**Set by portal, depending on context, to either draft or master. May be overridden. Default is the current branch set in portal.*/
    branch?: string;

    /**Set to true if the content must inherit permissions. Default to false.*/
    inheritPermissions?: boolean;

    /**Set to true to overwrite child permissions. Default to false.*/
    overwriteChildPermissions?: boolean;

    /**Array of permissions.*/
    permissions: Array<IPermission>;
}