/**
 * Parameters for getting the image url
 */
interface IImageUrlParams {
    /**ID of the image content.*/
    id: string;

    /**Path to the image. If id is specified, this parameter is not used.*/
    path: string;

    /**Required. Options are width(px), height(px), block(width,height) and square(px).*/
    scale: string;

    /**Quality for JPEG images, ranges from 0 (max compression) to 100 (min compression).*/
    quality?: number;

    /**Background color.*/
    background?: string;

    /**Format of the image.*/
    format?: string;

    /**A number of filters are available to alter the image appearance, for example, blur(3), grayscale(), rounded(5), etc.*/
    filter?: string;

    /**URL type. Either server (server-relative URL) or absolute.*/
    type?: string;

    /**Custom parameters to append to the url.*/
    params?: any;
}