/**
 * HTTP Request interface
 */
interface IRequest {
    /**URL to which the request is sent.*/
    url: string;

     /**The HTTP method to use for the request (e.g. "POST", "GET", "HEAD", "PUT", "DELETE").*/
    method?: string;

    /**Query or form parameters to be sent with the request.*/
    params?: any;

    /**HTTP headers, an object where the keys are header names and the values the header values.*/
    headers?: any;

    /**The timeout on establishing the connection, in milliseconds.*/
    connectionTimeout?: number;

    /**The timeout on waiting to receive data, in milliseconds.*/
    readTimeout?: number;

    /**Body content to send with the request, usually for POST or PUT requests. It can be of type string or stream.*/
    body?: any;

    /**Content type of the request.*/
    contentType?: string;

    /**Multipart form data to send with the request, an array of part objects. Each part object contains 'name', 'value', and optionally 'fileName' and 'contentType' properties. Where 'value' can be either a string or a Stream object.*/
    multipart?: Array<any>;

    /**Settings for basic authentication.*/
    auth?: {
        /**User name for basic authentication.*/
        user?: string;
        /**Password for basic authentication.*/
        password?: string;
    }

    /**Proxy settings.*/
    proxy?: {
        /**Proxy host name to use.*/
        host?: string;
        /**Proxy port to use.*/
        port?: string;
        /**User name for proxy authentication.*/
        user?: string;
        /**Password for proxy authentication.*/
        password?: string;
    }
}