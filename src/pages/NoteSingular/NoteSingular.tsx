import "./NoteSingular.scss";

import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, ButtonBase } from "@mui/material";
import { NoteInfoExtended } from "../../types/NoteInfoExtended";
import { dateToHumanReadable } from "../../helpers/dateFormat";

type Props = {}

const _resolver: { [id: number]: NoteInfoExtended } = {
    69696969: {
        noteId: 69696969,
        title: "Algebra liniowa",
        dateAdded: Date.now(),
        university: "AGH",
        degreeCourse: "ISI",
        contentPreview: "https://staticsmaker.iplsc.com/smaker_prod_2021_10_27/18033c10dac131a99f31b3ba5f62ee01-recipe_main.jpg",
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
        contentPreview: "https://staticsmaker.iplsc.com/smaker_production_2022_11_18/f295a8db401011c6102d753062e97d91-recipe_main.jpg",
        upvotes: 420,
        author: "Bogdan Ćmiel",
        category: "Matematyka",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum architecto praesentium molestias perspiciatis hic tempore eveniet, aut ratione quasi aliquam tenetur harum incidunt, sequi quibusdam!"
    }
};

const NoteSingular = (props: Props): JSX.Element => {
    const { id } = useParams();

    const note = id !== undefined ? _resolver[parseInt(id)] : undefined;

    return (
        note === undefined ?
            <Typography variant="h4">
                Nie znaleziono notatki
            </Typography>
            :
            <div className="note-singular">
                <Typography>Dodano: {dateToHumanReadable(new Date(note.dateAdded))}</Typography>
                <Typography>{note.university} - {note.degreeCourse}</Typography>
                <Typography variant="h2">{note.upvotes} {note.title}</Typography>
                <Typography>
                    <img src={note.contentPreview} alt="cover" />
                </Typography>
                <Typography variant="body1">{note.description}</Typography>
            </div>
    );
}

export { NoteSingular };