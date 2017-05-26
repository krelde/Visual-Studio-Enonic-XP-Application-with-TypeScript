/**
 * Mail message interface
 */
interface IMessage {

    /**The email address, and optionally name of the sender of the message.*/
    from: string;

    /**The email address(es), and optionally name(s) of the primary message’s recipient(s).*/
    to: Array<string>;

    /**The carbon copy email address(es).*/
    cc?: Array<string>;

    /**The blind carbon copy email address(es).*/
    bcc?: Array<string>;

    /**The email address that should be used to reply to the message.*/
    replyTo?: string;

    /**The subject line of the message.*/
    subject: string;

    /**The text content of the message.*/
    body: string;

    /**Content type of the message body.*/
    contentType?: string;

    /**Custom headers in the form of name-value pairs.*/
    headers?: any;

    /**Attachments to include in the email.*/
    attachments?: Array<IMessageAttachment>;
}