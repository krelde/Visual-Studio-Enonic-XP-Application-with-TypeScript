/**
 * Task informastion interface
 */
interface ITaskInfo {
    /**Task Id.*/
    id: string;

    /**Task description.*/
    description: string;

    /**Task state. Possible values: 'WAITING' | 'RUNNING' | 'FINISHED' | 'FAILED'*/
    state: string;

    /**Progress information provided by the running task.*/
    progress: {
        /**Latest progress current numeric value.*/
        current: number;
        /**Latest progress target numeric value.*/
        total: number;
        /**Latest progress textual information.*/
        info: string;
    }

}