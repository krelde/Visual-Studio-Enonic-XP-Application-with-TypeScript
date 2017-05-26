/**
* Create media input parameters
*/
interface ICreateMediaParams {
    /** Name of content.*/
    name?: string;

    /** Path to place content under.*/
    parentPath?: string;

    /** Mime-type of the data.*/
    mimeType?: string;

    /** Focal point for X axis (if it's an image).*/
    focalX?: string;

    /** Focal point for Y axis (if it's an image).*/
    focalY?: string;

    /** Set by portal, depending on context, to either draft or master. May be overridden, but this is not recommended. Default is the current branch set in portal.*/
    branch?: string;

    /** Data (as stream) to use.*/
    data?: any;
}