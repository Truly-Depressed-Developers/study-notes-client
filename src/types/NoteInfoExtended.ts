import { NoteInfo } from "./NoteInfo";

export type NoteInfoExtended = NoteInfo & {
    contentURL: string,
    description: string
}