//Investigate if this interface can be reused
interface IPrincipalBase {
    type: string;
    key: string;
    displayName: string; 
    modifiedTime: string; 
    description: string;
    disabled: boolean;
    email: string;
    login: string;
    userStore: string; 
    profile:any;
}