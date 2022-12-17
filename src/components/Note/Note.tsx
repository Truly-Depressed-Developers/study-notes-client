import "./Note.scss";

import { NoteInfo } from "../../types/NoteInfo";
import { Card, CardContent, Typography, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

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
            <Card>
                <CardContent>
                    <Typography>{new Date(props.dateAdded).toDateString()}</Typography>
                    <Typography>{props.title}</Typography>
                    <Typography>{props.university} - {props.degreeCourse}</Typography>
                </CardContent>
            </Card>
        </ButtonBase>
    );
}

export { Note };