declare namespace app {
    export function name(): string;
    export function version(): string;
    export function config(): any;
}

declare namespace log {
    export function debug(args:any): void;
    export function info(args:any): void;
    export function warning(args:any): void;
    export function error(args:any): void;
}

declare function resolve(path:string): string;

// NOTE: Require comes from @types/node
// TODO: exports and double underscore __
