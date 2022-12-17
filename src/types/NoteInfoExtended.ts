import { NoteInfo } from "./NoteInfo";

export type NoteInfoExtended = NoteInfo & {
    contentPreview: string,
    description: string
}