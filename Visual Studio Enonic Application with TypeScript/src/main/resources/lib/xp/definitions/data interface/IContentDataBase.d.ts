interface IContentDataBase {
    _id: string;
    _name: string;
    _path: string;
    creator: string;
    createdTime: string;
    modifiedTime:string;
    type:string;
    displayName: string;
    hasChildren: boolean;
    language: string;
    valid: boolean;
    data: any;
    x:any;
    page: any;
    attachments: any;
    publish: any;
}