import { ExerciseInfo } from "./ExerciseInfo";

export type ExerciseInfoExtended = ExerciseInfo & {
    answers: ExersiseSingularAnswer
}

type ExersiseSingularAnswer = {
    username: string,
    content: string,
    timestamp: string,
    upvotes: number,
    best_answer: number
}