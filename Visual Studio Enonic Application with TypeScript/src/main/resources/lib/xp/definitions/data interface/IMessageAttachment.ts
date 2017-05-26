/** Mail message attachment*/
interface IMessageAttachment {

    /**Attachment file name.*/
    fileName: string;

    /**Attachment stream.*/
    data: any;

    /**Attachment content type. If not specified will be inferred from the file extension.*/
    mimeType?: string;
}