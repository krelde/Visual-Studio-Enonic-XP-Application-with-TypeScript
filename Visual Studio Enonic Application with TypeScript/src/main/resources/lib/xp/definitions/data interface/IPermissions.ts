interface IPermissions {
    inheritsPermissions: boolean;
    permissions: IPermission;
}

interface IPermission {
    principal: string;
    allow: Array<string>;
    deny: Array<string>;
}