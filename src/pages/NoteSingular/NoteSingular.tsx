import "./NoteSingular.scss";

import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, ButtonBase } from "@mui/material";
import { NoteInfoExtended } from "../../types/NoteInfoExtended";
import { dateToHumanReadable } from "../../helpers/dateFormat";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { useEffect, useState } from "react";
import { Note } from "../../components/Note/Note";
import config from "../../config";

type Props = {}

const NoteSingular = (props: Props): JSX.Element => {
    const { id } = useParams();

    const [note, setNote] = useState<NoteInfoExtended>();

    const [numPages, setNumPages] = useState(0);

    useEffect(() => {
        fetch(`http://${config.ip}/get_one_note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                id: id?.toString() || ""
            })
        })
            .then((response) => response.json())
            .then((data) => {
                setNote(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    return (
        note === undefined ?
            <Typography variant="h4">
                Nie znaleziono notatki
            </Typography>
            :
            <div className="note-singular">
                <Note
                    id={note.id}
                    title={note.title}
                    university={note.university}
                    degree_course={note.degree_course}
                    timestamp={note.timestamp}
                    upvotes={note.upvotes}
                    username={note.username}
                    subject={note.subject}
                    scrollable={true}
                />

                <Document
                    className="pdf"
                    file={note.url}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                >
                    {Array(numPages).fill(null).map((_, i) => {
                        return (<Page
                            key={i}
                            pageNumber={i + 1}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                        />)
                    }
                    )}
                </Document>

                <div className="spacer"></div>
            </div>
    );
}

export { NoteSingular };