declare function define(dependencies: String[], factory: Function): any;
declare function require(config?: Object, dependencies?: String[], callback?: Function): any;

declare namespace lib {
    namespace xp {
        
        interface auth {
            addMembers(principalKey: string, members: string): any;
            changePassword(params: Object): any;
            createGroup(params: Object): any;
            createUser(params: Object): any;
            findPrincipals(params: Object): any;
            findUsers(params: Object): any;
            generatePassword(): string;
            getIdProviderConfig(): any;
            getMembers(principalKey: any): Array<Object>;
            getMemberships(principalKey: any): Array<Object>;
            getPrincipal(principalKey: any): any;
            getProfile(params: Object): any;
            getUser(params?: Object): any;
            hasRole(role: string): boolean;
            login(params: Object): any;
            logout(): void;
            modifyGroup(params: Object): any;
            modifyProfile(params:Object):any; 
            modifyUser(params: Object): any; 
            removeMembers(principalKey: string, members: string): any;
        }

        interface portal {
            //TODO: Create types for parmas (Comments)
            //TODO: Find and set correct return type
            assetUrl(params?: Object): any;
            attachmentUrl(params?: Object): any;
            componentUrl(params?: Object): any;
            getComponent(): any;
            getContent(): any;
            getMultipartForm(): any;
            getMultipartItem(name: string, index?: number): any;
            getMultipartStream(name: string, index?: number): any;
            getMultipartText(name: string, index?: number): any;
            getSite(params?: Object): any;
            getSiteConfig(): any;
            getUserStoreKey(): any;
            idProviderUrl(params?: Object): any;
            imageUrl(params: Object): any;
            loginUrl(params?: Object): any;
            logoutUrl(params?: Object): any;
            pageUrl(params: Object): any;
            processHtml(params: Object): any;
            sanitizeHtml(html: string): any;
            serviceUrl(params: Object): any;
            url(params: Object): any;
        }

        interface thymeleaf {
            render(view: any, model: any): any;
        }

        interface content {
            create(params: Object): any;
            createMedia(params: Object): any;
            delete(params: Object): any;
            get(params: Object): any;
            getAttachments(key: string): any;
            getAttachmentStream(params: Object): any;
            getChildren(params: Object): any;
            getPermissions(params: Object): any;
            //This function returns the parent site of a content.
            getSite(params: Object): any;
            getSiteConfig(params: Object): any;
            modify(params: Object): any;
            move(params: Object): any;
            publish(params: Object): any;
            query(params: Object): any;
            setPermissions(params: Object): any;
            unpublish(params: Object): any;
        }

        interface mail {
            send(massage: Object): boolean;
        }

        interface cahce {
            newCache(options: Object): any;
        }

        interface context {
            get(): any;
            //Not sure about the function type
            run(context: Object, callback: Function): any;
        }

        interface event {
            listener(params: Object): any;
            send(event: Object): any;
        }

        interface httpclient {
            request(params: Object): any;
        }

        interface i18n {
            localize(params: Object): any;
        }

        interface io {
            getMimeType(name: string): string;
            getResource(key: string): any;
            getSize(stream: any): any;
            newStream(text: string): any;
            processLines(stream: any, func: Function): Array<string>;
            readLines(stream: any): string;
            readText(stream: any): string;
        }

        interface mustache {
            render(view: any, model: Object): string;
        }

        interface node {
            connect(params: Object): any;
        }

        interface repo {
            create(params: Object): any;
            createBranch(params: Object): any;
            delete(id: string): boolean;
            deleteBranch(params: Object): any;
            get(id: string): any;
            list(): any;
            refresh(params?: Object): any;
        }

        interface task {
            get(taskId: string): any;
            list(): any;
            progress(params: Object): any;
            sleep(timeMillis:string):any;
            submit(params: Object): string;

        }

        interface value {
            binary(name: string, stream: any): any;
            geoPoint(lat: number, lon: number): any;
            geoPointString(value: string) : any;
            instant(value: string): any;
            localDate(value: string): any;
            localDateTime(value: string): any;
            localTime(value: string): any;
            reference(value:string): any;
        }

        interface websocket {
            addToGroup(group: string, id: string): any;
            removeFromGroup(group: string, id: string): any;
            send(id: string, message: string): any;
            sendToGroup(group:string, message:string):any;
        }

        interface xslt {
            render(view: any, model: Object): string;
        }
    }
}