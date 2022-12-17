import "./ExerciseSingular.scss";

import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, ButtonBase } from "@mui/material";
import { ExerciseInfoExtended } from "../../types/ExerciseInfoExtended";
import { dateToHumanReadable } from "../../helpers/dateFormat";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { useEffect, useState } from "react";
// import { Exercise } from "../../components/Note/Note";
// import { Exercise } from "../../components/Exercise/Exercise";
import { Exercise } from "../../components/Exercise/Exercise";
import config from "../../config";

type Props = {}

const ExerciseSingular = (props: Props): JSX.Element => {
    const { id } = useParams();

    const [exercise, setExercise] = useState<ExerciseInfoExtended>();

    // const [numPages, setNumPages] = useState(0);

    useEffect(() => {
        fetch(`http://${config.ip}/get_one_question`, {
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
                console.log(data);

                setExercise(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    return (
        exercise === undefined ?
            <Typography variant="h4">
                Nie znaleziono zadania
            </Typography>
            :
            <div className="exercise-singular">
                <
                <div className="spacer"></div>
            </div >
    );
}

export { ExerciseSingular };