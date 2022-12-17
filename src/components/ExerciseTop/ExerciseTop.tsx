import "./ExerciseTop.scss";

import { ExerciseInfo } from "../../types/ExerciseInfo";
import { Card, Typography, ButtonBase, Icon, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { dateToHumanReadable } from "../../helpers/dateFormat";

import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StarCircle from "../PointDisplay/StarCircle";

type Props = ExerciseInfo & { scrollable?: boolean };

const ExerciseTop = (props: Props): JSX.Element => {
    return (
        <ButtonBase
            className="exercise"
        >
            <Card className="exercise-content">
                <div className="exercise-text">
                    <div>
                        <Typography>{props.university}</Typography>
                        <Typography>&#x2022;</Typography>
                        <Typography>{props.degree_course}</Typography>
                        <Typography>&#x2022;</Typography>
                        <Typography>{props.subject}</Typography>
                    </div>
                    <div>
                        <Typography>{props.title}</Typography>
                        <Typography>{props.content}</Typography>
                    </div>
                    <div>
                        <Typography color="GrayText">{dateToHumanReadable(new Date(props.timestamp))}</Typography>
                        <Typography color="GrayText">{props.username}</Typography>
                    </div>
                    <div className="exercise-points">
                        <StarCircle />
                        <Typography>{props.points}</Typography>
                    </div>
                </div>
            </Card>
        </ButtonBase>
    );
}

export { ExerciseTop };