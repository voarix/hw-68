export interface Task {
    id: string;
    title: string;
    status: boolean;
}

export interface TaskForm {
    title: string;
    status: boolean;
}

export interface TaskApi {
    [id: string]: TaskForm;
}