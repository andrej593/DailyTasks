interface ITask {
    title: string,
    description: string,
    task: string,
    status: number,
    date: string,
    //DAILY
    //completedOn:string
    //time: string,
    //exclude: string[],
    //SPECIAL
    //warnDate: string,
}
const taskStatus = {
    inProgress: 0,
    completed: 1,
    failed: 2
};

export { ITask, taskStatus }