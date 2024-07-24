export interface Score {
    _id: string;
    score: number;
    date: Date;
}

export interface Curriculum {
    _id?: string;
    student_id: string;
    elective_id: string;
    scores?: Score[];
    final_score?: number;
}