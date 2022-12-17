import { ExerciseInfo } from "./ExerciseInfo";

export type ExerciseInfoExtended = ExerciseInfo & {
    url: string
}

export type ExersiseSingularAnswer = {
    username: string,
    content: string,
    timestamp: string,
    upvotes: number,
    best_answer: number
}

export type ExerciseSingularInfo = {
    id: number,
    username: string,
    university: string,
    degree_course: string,
    subject: string,
    title: string,
    content: string,
    points: number,
    exercise_set: string,
    timestamp: string,
    answers: ExersiseSingularAnswer
}