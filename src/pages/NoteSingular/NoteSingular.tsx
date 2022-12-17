import "./NoteSingular.scss";

import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, ButtonBase } from "@mui/material";
import { NoteInfoExtended } from "../../types/NoteInfoExtended";
import { dateToHumanReadable } from "../../helpers/dateFormat";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { useState } from "react";
import { Note } from "../../components/Note/Note";

type Props = {}

const _resolver: { [id: number]: NoteInfoExtended } = {
    69696969: {
        noteId: 69696969,
        title: "Algebra liniowa",
        dateAdded: Date.now(),
        university: "AGH",
        degreeCourse: "ISI",
        contentURL: "/media/pdf/skrypt v0.5.pdf",
        upvotes: 69,
        author: "Your mom",
        category: "Matematyka",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nihil recusandae eos eligendi beatae dolores obcaecati perspiciatis minus numquam? Ratione reprehenderit modi atque eligendi totam illo sapiente nulla vel officiis! Saepe ullam, fugit quisquam a maiores, atque distinctio natus velit, est iure laborum praesentium perspiciatis? Dicta doloribus doloremque culpa assumenda."
    },
    4202137: {
        noteId: 4202137,
        title: "Analiza matematyczna 1",
        dateAdded: Date.now(),
        university: "AGH",
        degreeCourse: "ISI",
        contentURL: "/media/pdf/W14.pdf",
        upvotes: 420,
        author: "Bogdan Ćmiel",
        category: "Matematyka",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum architecto praesentium molestias perspiciatis hic tempore eveniet, aut ratione quasi aliquam tenetur harum incidunt, sequi quibusdam!"
    }
};

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