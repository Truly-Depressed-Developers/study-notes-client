import "./AddNote.scss";

import { EditableNote } from "../../components/EditableNote/EditableNote";

type Props = { userId: number }

const AddNote = (props: Props): JSX.Element => {
    return (
        <div className="note-singular">
            <div className="spacer"></div>
            <EditableNote userId={props.userId} />
            <div className="spacer"></div>
        </div>
    );
}

export { AddNote };