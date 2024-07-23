export interface Hours {
    lecture: number;
    lab: number;
    tutorial: number;
}

export interface Elective {
    _id?: string;
    title: string;
    duration: number;
    hours: Hours;
}