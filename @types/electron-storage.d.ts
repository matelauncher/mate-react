declare module 'electron-storage' {
    /**
     * Get from storage
     * 
     * @param path path to JSON File
     * @param callback callback function
     * 
     * @example
     * storage.get('file', (err, data) => {
     *     if (err) {
     *          console.error(err)
     *          return
     *     }
     * 
     *     console.log(data)
     * })
     */
    function get<T>(path: string, callback: (err: Error, data: T) => void): void;
    /**
     * Get from storage
     * 
     * @param path path to JSON File
     * 
     * @example
     * storage.get('file')
     * .then(data => {
     *     console.log(data)
     * })
     * .catch(err => {
     *     console.error(err)
     * })
     */
    function get<T>(path: string): Promise<T>;
    /**
     * Set to storage
     * 
     * @param path path to JSON File
     * @param data data to set
     * @param callback callback function
     * 
     * @example
     * storage.set('file', { example: 'example' }, (err) => {
     *      console.error(err)
     * })
     */
    function set<T>(path: string, data: T, callback: (err: Error) => void): void;
    /**
     * Set to storage
     * 
     * @param path path to JSON File
     * @param data data to set
     * 
     * @example
     * storage.set('file', { example: 'example' }
     * .catch(err) => {
     *      console.error(err)
     * })
     */
    function set<T>(path: string, data: T): Promise<void>;
    /**
     * Checks if the path exists
     * 
     * @param path path to JSON file
     * @param callback callback function
     * 
     * @example
     * storage.isPathExists('file', isExists => console.log(isExists))
     */
    function isPathExists(path: string, callback: (isExists: boolean) => void): void;
    /**
     * Checks if the path exists
     * 
     * @param path path to JSON file
     * 
     * @example
     * storage.isPathExists('file')
     * .then(isExists => console.log(isExists))
     */
    function isPathExists(path: string): Promise<boolean>;
    /**
     * Remove a file from path
     * 
     * @param path path to JSON file
     * @param callback callback function
     * 
     * @example
     * storage.remove('file', (err) => {
     *     if (err) console.error(err)
     * })
     */
    function remove(path: string, callback: (err: Error) => void): void;
    /**
     * Remove a file from path
     * 
     * @param path path to JSON file
     * @param callback callback function
     * 
     * @example
     * storage.remove('file')
     * .then(err => {
     *     if (err) console.error(err)
     * })
     */
    function remove(path: string): Promise<Error>;
}