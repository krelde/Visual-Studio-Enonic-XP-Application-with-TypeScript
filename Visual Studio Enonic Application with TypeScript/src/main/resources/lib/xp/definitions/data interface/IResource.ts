/**
 * Resource object interface
 */
interface IResource {
    /**
     * Returns true if the resource exists.
     * @returns {boolean True if resource exists.
     */
    exists(): boolean;

    /**
     * Returns the resource size.
     * @returns {number} Size of resource in bytes.
     */
    getSize(): number;

    /**
     * Returns the resource stream.
     * @returns {any} Stream of resource.
     */
    getStream(): any;
}