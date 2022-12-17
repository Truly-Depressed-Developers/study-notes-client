import "./Exercise.scss";

import { ExerciseInfo } from "../../types/ExerciseInfo";
import { Card, Typography, ButtonBase, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { dateToHumanReadable } from "../../helpers/dateFormat";

import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type Props = ExerciseInfo & { scrollable?: boolean };

const Exercise = (props: Props): JSX.Element => {
	const navigate = useNavigate();

	const onExerciseClick = useCallback(() => {
		navigate(`./${props.id}`);
	}, [navigate, props.id]);

	const IconToDisplay = () => props.scrollable ? KeyboardArrowUpIcon : ArrowForwardIosIcon;

	return (
		<ButtonBase
			className={"exercise" + (props.scrollable ? " scrollable" : "")}
			onClick={props.scrollable ? () => window.scroll(0, 0) : () => onExerciseClick()}
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
					</div>
					<div>
						<Typography color="GrayText">{dateToHumanReadable(new Date(props.timestamp))}</Typography>
						<Typography color="GrayText">{props.username}</Typography>
					</div>
				</div>
				<div className="exercise-likes">
					<Icon
						component={FavoriteIcon}
						color="warning"
					/>
					<Typography>{props.upvotes}</Typography>
					<Icon
						component={IconToDisplay()}
						color="primary"
					/>
				</div>
			</Card>
		</ButtonBase>
	);
}

export { Exercise };