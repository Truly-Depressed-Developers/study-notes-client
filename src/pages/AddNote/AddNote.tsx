import "./AddNote.scss";

import { EditableNote } from "../../components/EditableNote/EditableNote";

type Props = {}

const AddNote = (props: Props): JSX.Element => {
    return (
        <div className="note-singular">
            <div className="spacer"></div>
            <EditableNote />
            <div className="spacer"></div>
        </div>
    );
}

export { AddNote };