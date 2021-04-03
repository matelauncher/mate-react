declare module 'electron-storage' {
    function get(path: string, callback: (err: Error, data: any) => void): void;
    function get(path: string): Promise<any>;
    function set(path: string, data: any, callback: (err: Error) => void): void;
    function set(path: string, data: any): Promise<void>;
    function isPathExists(path: string, callback: (isExists: boolean) => void): void;
    function isPathExists(path: string): Promise<boolean>;
    function remove(path: string, callback: (err: Error) => void): void;
    function remove(path: string): Promise<Error>;
}