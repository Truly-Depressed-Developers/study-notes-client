import "./Note.scss";

import { NoteInfo } from "../../types/NoteInfo";
import { Card, Typography, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { dateToHumanReadable } from "../../helpers/dateFormat";

type Props = NoteInfo;

const Note = (props: Props): JSX.Element => {
    const navigate = useNavigate();

    const onNoteClick = useCallback(() => {
        navigate(`./${props.noteId}`);
    }, [navigate, props.noteId]);

    return (
        <ButtonBase
            className="note"
            onClick={() => onNoteClick()}
        >
            <Card className="note-content">
                <div>
                    <Typography component="div">
                        {dateToHumanReadable(new Date(props.dateAdded))},
                        &nbsp;
                        Kategoria,
                        &nbsp;
                        {props.university} - {props.degreeCourse}
                    </Typography>
                </div>
                <div>
                    <Typography variant="h4" component="div">{props.upvotes}</Typography>
                    <Typography variant="h4">{props.title}</Typography>
                </div>
            </Card>
        </ButtonBase>
    );
}

export { Note };