export interface Hours {
    lecture: number;
    lab: number;
    tutorial: number;
}

export interface Elective {
    id: number;
    title: string;
    hours: Hours;
    duration: number;
}