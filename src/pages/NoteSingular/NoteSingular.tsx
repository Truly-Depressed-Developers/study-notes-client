import "./NoteSingular.scss";

import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, ButtonBase } from "@mui/material";
import { NoteInfoExtended } from "../../types/NoteInfoExtended";
import { dateToHumanReadable } from "../../helpers/dateFormat";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { useState } from "react";
import { Note } from "../../components/Note/Note";

type Props = {}

const _resolver: { [id: number]: NoteInfoExtended } = {};

const NoteSingular = (props: Props): JSX.Element => {
    const { id } = useParams();

    const note = id !== undefined ? _resolver[parseInt(id)] : undefined;

    const [numPages, setNumPages] = useState(0);

    return (
        note === undefined ?
            <Typography variant="h4">
                Nie znaleziono notatki
            </Typography>
            :
            <div className="note-singular">
                <Note
                    noteId={note.noteId}
                    title={note.title}
                    university={note.university}
                    degreeCourse={note.degreeCourse}
                    dateAdded={note.dateAdded}
                    upvotes={note.upvotes}
                    author={note.author}
                    category={note.category}
                    scrollable={true}
                />

                <Document
                    className="pdf"
                    file={note.contentURL}
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