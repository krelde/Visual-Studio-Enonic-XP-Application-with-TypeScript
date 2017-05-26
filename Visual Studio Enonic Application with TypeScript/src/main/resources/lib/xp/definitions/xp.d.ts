declare function define(dependencies: String[], factory: Function): any;
declare function require(config?: Object, dependencies?: String[], callback?: Function): any;

/**
 * Resolves a path to another file. Can use relative or absolute path.
 * @param pathPath to resolve.
 */
declare function resolve(path: string): any;

declare namespace lib {
    namespace xp {
        /**
         * Built-in authentication functions.
         */
        interface auth {
            /**
             * Adds members to a principal (user or role).
             * @param principalKey Key of the principal to add members to.
             * @param members Keys of the principals to add.
             * @returns {} 
             */
            addMembers(principalKey: string, members: string): void;

            /**
             * Changes password for specified user.
             * @param params userKey and password 
             * @returns {} 
             */
            changePassword(params: { userKey: string, password: string }): void;

            /**
             * Creates a group.
             * @param params 
             * @returns {IPrincipalBase} Information about the created group.
             */
            createGroup(params: { userStore: string, name: string, displayName: string, description: string }): IPrincipalBase;

            /**
             * Creates user from passed parameters.
             * @param params 
             * @returns {IPrincipalBase} Information when creating a user.
             */
            createUser(params: { userStore: string, name: string, displayName: string, email?: string }): IPrincipalBase;

            /**
             * Search for principals matching the specified criteria.
             * @param params 
             * @returns {IPrincipalsResult} The "total" number of principals matching the search, the "count" of principals included, and an array of "hits" containing the principals.
             */
            findPrincipals(params: { type?: string, userStore?: string, start?: string; count?: string, name?: string, searchText?: string }): IPrincipalsResult;

            /**
             * Search for users matching the specified query.
             * @param params 
             * @returns {IPrincipalBase} Result of query.
             */
            findUsers(params: { start?: number, count?: number, query: string, sort?: string, includeProfile?: boolean }): IPrincipalBase;

            /**
             * Generates a secure password.
             * @returns {string} A secure generated password.
             */
            generatePassword(): string;

            /**
             * This function returns the ID provider configuration for the current user store. It is meant to be called from an ID provider controller.
             * @returns {any} The ID provider configuration for current user store as JSON.
             */
            getIdProviderConfig(): any;

            /**
             * Returns a list of principals that are members of the specified principal.
             * @param principalKey Principal key to retrieve members for.
             * @returns {Array<IPrincipalBase>} Returns the list of principals.
             */
            getMembers(principalKey: string): Array<IPrincipalBase>;

            /**
             * Returns a list of principals the specified principal is a member of.
             * @param principalKey Principal key to retrieve memberships for.
             * @returns {Array<IPrincipalBase>} Returns the list of principals.
             */
            getMemberships(principalKey: string): Array<IPrincipalBase>;

            /**
             * Returns the principal with the specified key.
             * @param principalKey Principal key to look for.
             * @returns {IPrincipalBase} The principal specified, or null if it doesn't exist.
             */
            getPrincipal(principalKey: string): IPrincipalBase;

            /**
             * This function retrieves the profile of a user.
             * @param params 
             * @returns {any} The extra data as JSON
             */
            getProfile(params: { key: string, scope?: string }): any;

            /**
             * Returns the logged-in user. If not logged-in, this will return undefined.
             * @param params 
             * @returns {IPrincipalBase} Information for logged-in user.
             */
            getUser(params?: { includeProfile?: boolean }): IPrincipalBase;

            /**
             * Checks if the logged-in user has the specified role.
             * @param role Role to check for.
             * @returns {boolean} True if the user has specfied role, false otherwise.
             */
            hasRole(role: string): boolean;

            /**
             * Login a user with the specified userStore, userName and password.
             * @param params 
             * @returns {IAuthenticationResult} Information for logged-in user.
             */
            login(params: { user: string, userStore?: string, password?: string, skipAuth?: string }): IAuthenticationResult;

            /**
             * Logout an already logged-in user.
             * @returns {} 
             */
            logout(): void;

            /**
             * Retrieves the group specified and updates it with the changes applied.
             * @param params 
             * @returns {} the updated group.
             */
            modifyGroup(params: { key: string, editor: string }): IPrincipalBase;

            /**
             * This function retrieves the profile of a user and updates it.
             * @param params 
             * @returns {} The extra data as JSON
             */
            modifyProfile(params: { key: string, scope?: string, editor: any }): any;

            /**
             * Retrieves the user specified and updates it with the changes applied.
             * @param params 
             * @returns {IPrincipalBase} The updated user.
             */
            modifyUser(params: { key: string, editor: string }): IPrincipalBase;

            /**
             * Removes members from a principal (user or role).
             * @param principalKey Key of the principal to remove members from.
             * @param members Keys of the principals to remove.
             * @returns {} 
             */
            removeMembers(principalKey: string, members: string): void;
        }

        /**
         * Functions to access portal functionality.
         */
        interface portal {
            /**
             * This function generates a URL pointing to a static file.
             * @param params 
             * @returns {string} The generated URL.
             */
            assetUrl(params: { path: string, application?: string, type?: string, params?: string }): string;

            /**
             * This function generates a URL pointing to an attachment.
             * @param params 
             * @returns {string}  The generated URL.
             */
            attachmentUrl(params: { id?: string, path?: string, name?: string, type?: string, download?: boolean, params?: any }): string;

            /**
             * This function generates a URL pointing to a component.
             * @param params 
             * @returns {string} The generated URL.
             */
            componentUrl(params: { id?: string, path?: string, component?: string, type?: string, params?: any }): string;

            /**
             * This function returns the component corresponding to the current execution context. It is meant to be called from a layout or part controller.
             * @returns {IComponentBase} The current component as JSON.
             */
            getComponent(): IComponentBase;

            /**
             * This function returns the content corresponding to the current execution context. It is meant to be called from a page, layout or part controller
             * @returns {IContentDataBase} The current content as JSON.
             */
            getContent(): IContentDataBase;

            /**
             * This function returns a JSON containing multipart items. If not a multipart request, then this function returns undefined.
             * @returns {any} The multipart form items.
             */
            getMultipartForm(): any;

            /**
             * This function returns a JSON containing a named multipart item. If the item does not exists, it returns undefined.
             * @param name Name of the multipart item.
             * @param index Optional zero-based index. It should be specified if there are multiple items with the same name.
             * @returns {any} The named multipart form item.
             */
            getMultipartItem(name: string, index?: number): any;

            /**
             * This function returns a data-stream for a named multipart item.
             * @param name Name of the multipart item.
             * @param index Optional zero-based index. It should be specified if there are multiple items with the same name.
             * @returns {any} Stream of multipart item data.
             */
            getMultipartStream(name: string, index?: number): any;

            /**
             * This function returns the multipart item data as text.
             * @param name Name of the multipart item.
             * @param index Optional zero-based index. It should be specified if there are multiple items with the same name.
             * @returns {string}  Text for multipart item data.
             */
            getMultipartText(name: string, index?: number): string;

            /**
             * This function returns the parent site of the content corresponding to the current execution context. It is meant to be called from a page, layout or part controller.
             * @returns {IContentDataBase} The current site as JSON.
             */
            getSite(): IContentDataBase;

            /**
             * This function returns the site configuration for this app in the parent site of the content corresponding to the current execution context. It is meant to be called from a page, layout or part controller.
             * @returns {any} The site configuration for current application as JSON.
             */
            getSiteConfig(): any;

            /**
             * This function returns the user store key corresponding to the current execution context.
             * @returns {any} The current user store as JSON.
             */
            getUserStoreKey(): any;

            /**
             * This function generates a URL pointing to an ID provider.
             * @param params 
             * @returns {string} The generated URL.
             */
            idProviderUrl(params: { userStore?: string, type?: string, params?: any }): string;

            /**
             * This function generates a URL pointing to an image.
             * @param {IImageUrlParams} params
             * @returns {string}  The generated URL.
             */
            imageUrl(params: IImageUrlParams): string;

            /**
             * This function generates a URL pointing to the login function of the ID provider corresponding to the current user.
             * @param params 
             * @returns {string}  The generated URL.
             */
            loginUrl(params?: { userStore?: string, redirect?: string, type?: string, params?: any }): string;

            /**
             * This function generates a URL pointing to the logout function of the ID provider corresponding to the current user.
             * @param params 
             * @returns {string} The generated URL.
             */
            logoutUrl(params?: { redirect?: string, type?: string, params?: any }): string;

            /**
             * This function generates a URL pointing to a page.
             * @param params 
             * @returns {string} The generated URL.
             */
            pageUrl(params: { id?: string, path?: string, type?: string, params?: any }): string;

            /**
             * This function replaces abstract internal links contained in an HTML text by generated URLs.When outputting processed HTML in Thymeleaf, use attribute data-th-utext="${processedHtml}".
             * @param params 
             * @returns {string} The processed HTML.
             */
            processHtml(params: { value: string, type?: string }): string;

            /**
             * This function sanitizes an HTML string by stripping all potentially unsafe tags and attributes.
             * HTML sanitization can be used to protect against cross-site scripting (XSS) attacks by sanitizing any HTML code submitted by a user
             * @param html Html string value to process.
             * @returns {string} The sanitized HTML.
             */
            sanitizeHtml(html: string): string;

            /**
             * This function generates a URL pointing to a service.
             * @param params 
             * @returns {string} The generated URL.
             */
            serviceUrl(params: { service: string, application?: string, type?: string, params?: any }): any;

            /**
             * This function generates a URL
             * @param params 
             * @returns {string} The generated URL.
             */
            url(params: { path: string, type?: string, params?: any }): string;
        }

        /**
         * Thymeleaf template related functions.
         */
        interface thymeleaf {
            /**
             * This function renders a view using thymeleaf.
             * @param view Location of the view. Use resolve(..) to resolve a view.
             * @param model Model that is passed to the view.
             * @returns {string} The rendered output.
             */
            render(view: any, model: any): string;
        }

        /**
         * Functions to find and manipulate content.
         */
        interface content {
            /**
             * This function creates a content.
               The parameter name is optional, but if it is not set then displayName must be specified. When name is not set, the system will auto-generate a name based on the displayName, by lower-casing and replacing certain characters. If there is already a content with the auto-generated name, a suffix will be added to the name in order to make it unique.
               To create a content where the name is not important and there could be multiple instances under the same parent content, skip the name parameter and specify a displayName
             * @param {ICreateContentParams}params
             * @returns {IContentDataBase} Content created as JSON
             */
            create(params: ICreateContentParams): IContentDataBase;

            /**
             * Creates a media content.
             * @param{ICreateMediaParams} params
             * @returns {IContentDataBase} Returns the created media content.
             */
            createMedia(params: ICreateMediaParams): IContentDataBase;

            /**
             * This function deletes a content.
             * @param params key: Path or id to the content. branch: Set by portal, depending on context, to either draft or master. May be overridden, but this is not recommended. Default is the current branch set in portal.
             * @returns {boolean} True if deleted, false otherwise.
             */
            delete(params: { key: string, branch?: string }): boolean;

            /**
             * This function fetches a content.
             * @param params  key: Path or id to the content. branch: Set by portal, depending on context, to either draft or master. May be overridden, but this is not recommended. Default is the current branch set in portal.
             * @returns {IContentDataBase} The content (as JSON) fetched from the repository.
             */
            get(params: { key: string, branch?: string }): IContentDataBase;

            /**
             * This function returns a content attachments.
             * @param {string}key Path or id to the content.
             * @returns {Array<IAttachmentData>} An object with all the attachments that belong to the content, where the key is the attachment name. Or null if the content cannot be found.
             */
            getAttachments(key: string): Array<IAttachmentData>;

            /**
             * This function returns a data-stream for the specified content attachment.
             * @param params 
             * @returns {any} Stream of the attachment data.
             */
            getAttachmentStream(params: { key: string, name: string }): any;

            /**
             * This function fetches children of a content.
             * @param {IGetChildrenParams} params
             * @returns {IContentDataResult} Result (of content) fetched from the repository.
             */
            getChildren(params: IGetChildrenParams): IContentDataResult;

            /**
             * Gets permissions on a content.
             * @param params {key} Path or id of the content.
             * @returns {IPermissions} Content permissions.
             */
            getPermissions(params: { key: string }): IPermissions;

            /**
             * This function returns the parent site of a content.
             * @param params {key} Path or id of the content.
             * @returns {IContentDataBase} The current site as JSON.
             */
            getSite(params: { key: string }): IContentDataBase;

            /**
             * This function returns the site configuration for this app in the parent site of a content.
             * @param params 
             * @returns {} 
             */
            getSiteConfig(params: { key: string, applicationKey: string }): any;

            /**
             * This function modifies a content.
             * @param {IModifyParams} params
             * @returns {IContentDataBase} Modified content as JSON.
             */
            modify(params: IModifyParams): IContentDataBase;

            /**
             * Rename a content or move it to a new path.
             * @param params 
             * @returns {IContentDataBase} The content that was moved or renamed.
             */
            move(params: { source: string, target: string, branch?: string }): IContentDataBase;

            /**
             * This function publishes content to a branch.
             * @param {IPublishParams}params
             * @returns {IPublicationResult} Status of the publish operation in JSON.
             */
            publish(params: IPublishParams): IPublicationResult;

            /**
             * This command queries content.
             * @param {IQueryParams}params
             * @returns {IContentDataResult} Result of query.
             */
            query(params: IQueryParams): IContentDataResult;

            /**
             * Sets permissions on a content.
             * @param {ISetPermissionsParams} params
             * @returns {boolean} True if successful, false otherwise.
             */
            setPermissions(params: ISetPermissionsParams): boolean;

            /**
             * This function unpublishes content that had been published to the master branch.
             * @param params List of all content keys(path or id) that should be unpublished.
             * @returns {Array<string>} List with ids of the content that were unpublished.
             */
            unpublish(params: { keys: Array<string> }): Array<string>;
        }

        /**
         * Mail related functions.
         */
        interface mail {
            /**
             *  This function sends an email message using the mail server configured.
                The address values can be either a simple email address (e.g. ‘name@domain.org’ ) or an address with a display name. In the latter case the email will be enclosed with angle brackets (e.g. ‘Some Name name@domain.org’ ).
                The parameters to, cc and bcc can be passed as a single string or as an array of strings, if there are multiple addresses to specify.
                The content-type of the email can be specified by using the contentType parameter. See example below for sending a message with an HTML body.
             * @param {IMessage} massage
             * @returns {boolean} True if the message was sent successfully, false otherwise.
             */
            send(massage: IMessage): boolean;
        }

        interface cahce {
            /**
             * Creates a new cache.
             * @param options 
             * @returns {ICache} Returns a new cache instance.
             */
            newCache(options: { size: number, expire: number }): ICache;
        }

        /**
         * Built-in context functions.
         */
        interface context {
            /**
             * Returns the current context.
             * @returns {IContext} Return the current context as JSON object.
             */
            get(): IContext;

            /**
             * Runs a function within a specified context.
             * @param context The conext object
             * @param callback Function to execute.
             * @returns {any} Result of the function execution.
             */
            run(context: IContext, callback: ICallback): any;
        }

        /**
         * Event functions.
         */
        interface event {
            /**
             * This function adds a event listener.
             * @param params Listener parameters.
             * @returns {void} 
             */
            listener(params: { type: string, callback: ICallback, localOnly: boolean }): void;

            /**
             * This function sends a custom event. All custom events are prefixed "custom.".
             * @param event Event to send.
             * @returns {void} 
             */
            send(event: { type: string, distributed: boolean, data: any }): void;
        }

        /**
         * HTTP Client related functions.
         */
        interface httpclient {
            /**
             * Sends an HTTP request and returns the response received from the remote server. The request is sent synchronously, the execution blocks until the response is received.
             * @param {IRequest}params JSON parameters.
             * @returns {any} Response HTTP response received.
             */
            request(params: IRequest): any; //TODO: Create response interface
        }

        /**
         * Internationalization functions.
         */
        interface i18n {
            /**
             * This function localizes a phrase.
             * @param params 
             * @returns {string} The localized string.
             */
            localize(params: { key: string, locale?: string, values?: Array<string> }): string;
        }

        /**
         * IO related functions.
         */
        interface io {
            /**
             * Returns the mime-type from a name or extension.
             * @param {string} name Name of file or extension.
             * @returns {string} Mime-type of name or extension.
             */
            getMimeType(name: string): string;

            /**
             * Looks up a resource.
             * @param key Resource key to look up.
             * @returns {IResource} Resource reference.
             */
            getResource(key: string): IResource;

            /**
             * Gets the size of a stream.
             * @param stream Stream to get size of.
             * @returns {number} Returns the size of a stream.
             */
            getSize(stream: any): number;

            /**
             * Returns a new stream from a string.
             * @param text String to create a stream of.
             * @returns {any} A new stram 
             */
            newStream(text: string): any;

            /**
             * Process lines from a stream.
             * @param stream Stream to read lines from.
             * @param func Callback function to be called for each line.
             * @returns {} 
             */
            processLines(stream: any, func: ICallback): void;

            /**
             * Read lines from a stream.
             * @param stream Stream to read lines from.
             * @returns {Array<string>} Returns lines as an array.
             */
            readLines(stream: any): Array<string>;

            /**
             * Read text from a stream.
             * @param stream Stream to read text from.
             * @returns {string} Returns the text read from stream or string.
             */
            readText(stream: any): string;
        }

        /**
         * Mustache template related functions.
         */
        interface mustache {
            /**
             * This function renders a view using mustache.
             * @param view Location of the view. Use resolve(..) to resolve a view.
             * @param model Model that is passed to the view.
             * @returns {string} The rendered output.
             */
            render(view: any, model: Object): string;
        }

        /**
         * Functions to get, query and manipulate nodes.
         */
        interface node {
            /**
             * Creates a connection to a repository with a given branch and authentication info.
             * @param params 
             * @returns {any} Returns a new repo-connection.
             */
            connect(params: INodeRepoConnectionParams): any;
        }

        /**
         * Node repository related functions.
         */
        interface repo {
            /**
             * Creates a repository
             * @param params JSON with the parameters.
             * @returns {} Repository created as JSON.
             */
            create(params: ICreateRepoParams): any;

            /**
             * Creates a branch
             * @param params JSON with the parameters.
             * @returns {any} The branch (as JSON).
             */
            createBranch(params: { branchId: string, repoId: string; }): any;

            /**
             * Deletes a repository
             * @param id Repository ID.
             * @returns {boolean} true if deleted, false otherwise.
             */
            delete(id: string): boolean;

            /**
             * Deletes a branch
             * @param params JSON with the parameters.
             * @returns {any} The branch (as JSON).
             */
            deleteBranch(params: { branchId: string, repoId: string; }): any;

            /**
             * Retrieves a repository
             * @param id Repository ID.
             * @returns {any} The repository (as JSON).
             */
            get(id: string): any;

            /**
             * Retrieves the list of repositories
             * @returns {any} The repositories (as JSON array).
             */
            list(): any;

            /**
             * Refresh the data for the given index-type in the current repository.
             * @param params JSON with the parameters.
             * @returns {void} 
             */
            refresh(params?: { mode?: string, repo?: string, branch?:string }): void;
        }

        /**
         * Functions for execution of asynchronous tasks.
         */
        interface task {
            /**
             * Returns the current state and progress details for the specified task.
             * @param taskIdId of the task.
             * @returns {ITaskInfo} Detail information for the task. Or null if the task could not be found.
             */
            get(taskId: string): ITaskInfo;

            /**
             * Returns the list of active tasks with their current state and progress details.
             * @returns {} List with task information for every task.
             */
            list(): Array<ITaskInfo>;

            /**
             * Reports progress information from an executing task. This function may only be called within the context of a task function, otherwise it will fail and throw an exception.
             * @param params JSON with progress details.
             */
            progress(params: { current?: number, total?: number, info?: string }): void;

            /**
             * Causes the current execution thread to sleep (temporarily cease execution) for the specified number of milliseconds.
             * @param {string} timeMillis 
             */
            sleep(timeMillis: string): void;

            /**
             * Submits a task to be executed in the background and returns an id representing the task. This function returns immediately. The callback function will be executed asynchronously.
             * @param params JSON with the parameters.
             * @returns {string} Id of the task that will be executed.
             */
            submit(params: { description:string, task:ICallback}): string;

        }

        /**
         * Functions to pass java-types in JSON, typically usage is to type e.g a Geo-point value when creating nodes in node-lib.
         */
        //TODO: Create java geo point
        interface value {
            /**
             * Creates a BinaryAttachment java-type.
             * @param name The binary name
             * @param stream The binary stream
             * @returns {any} BinaryAttachment java-type
             */
            binary(name: string, stream: any): any;

            /**
             * Creates a GeoPoint java-type.
             * @param lat Latitude
             * @param lon Longitude
             * @returns {IGeoPoint} GeoPoint java-type
             */
            geoPoint(lat: number, lon: number): IGeoPoint;

            /**
             * Creates a GeoPoint java-type.
             * @param value comma-separated lat and lon
             * @returns {IGeoPoint}GeoPoint java-type
             */
            geoPointString(value: string): IGeoPoint;

            /**
             * Creates a Instant java-type.
             * @param value An ISO-8601-formatted instant (e.g '2011-12-03T10:15:30Z')
             * @returns {any} Instant java-type
             */
            instant(value: string): any;

            /**
             * Creates a LocalDate java-type.
             * @param value A ISO local date-time string (e.g '2011-12-03')
             * @returns {any} LocalDate java-type
             */
            localDate(value: string): any;

            /**
             * Creates a LocalDateTime java-type.
             * @param value A local date-time string (e.g '2007-12-03T10:15:30')
             * @returns {any} LocalDateTime java-type
             */
            localDateTime(value: string): any;

            /**
             * Creates a LocalTime java-type.
             * @param value A ISO local date-time string (e.g '10:15:30')
             * @returns {any} LocalTime java-type
             */
            localTime(value: string): any;

            /**
             * Creates a Reference java-type.
             * @param value A nodeId as string (e.g '1234-5678-91011')
             * @returns {any} Reference java-type
             */
            reference(value: string): any;
        }

        /**
         * Websocket functions.
         */
        interface websocket {
            /**
             * Add an id to a socket group.
             * @param group Group name.
             * @param id Socket id.
             */
            addToGroup(group: string, id: string): void;

            /**
             * Remove an id from a socket group.
             * @param group Group name.
             * @param id Socket id.
             */
            removeFromGroup(group: string, id: string): void;

            /**
             * Send message directly to a socket id.
             * @param id Socket id.
             * @param message Message as text.
             */
            send(id: string, message: string): void;

            /**
             * Send message to all sockets in group.
             * @param group Group name
             * @param message Message as text
             */
            sendToGroup(group: string, message: string): void;
        }

        interface xslt {
            /**
             * This function renders a view using XSLT. The model is automatically transformed to XML.
             * @param view Location of the view. Use resolve(..) to resolve a view.
             * @param model Model that is passed to the view.
             * @returns {string} The rendered output.
             */
            render(view: any, model: any): string;
        }
    }
}