import { Note } from "../../components/Note/Note";
import { NoteInfo } from "../../types/NoteInfo";
import "./Notes.scss";

type Props = {}

const notes: NoteInfo[] = [
    {
        noteId: 69696969,
        title: "Algebra liniowa",
        dateAdded: Date.now(),
        university: "AGH",
        degreeCourse: "ISI",
        upvotes: 69
    },
    {
        noteId: 4202137,
        title: "Analiza matematyczna 1",
        dateAdded: Date.now(),
        university: "AGH",
        degreeCourse: "ISI",
        upvotes: 420
    }
];

const Notes = (props: Props): JSX.Element => {
    return (
        <div id="notes">
            {notes.map(n =>
                <Note
                    key={n.noteId}
                    noteId={n.noteId}
                    title={n.title}
                    dateAdded={n.dateAdded}
                    university={n.university}
                    degreeCourse={n.degreeCourse}
                    upvotes={n.upvotes}
                />
            )}
        </div>
    );
}

export { Notes };