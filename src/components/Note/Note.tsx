import "./Note.scss";

import { NoteInfo } from "../../types/NoteInfo";
import { Card, Typography, ButtonBase, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { dateToHumanReadable } from "../../helpers/dateFormat";

import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

type Props = NoteInfo;

const Note = (props: Props): JSX.Element => {
	const navigate = useNavigate();

	const onNoteClick = useCallback(() => {
		navigate(`./${props.id}`);
	}, [navigate, props.id]);

	return (
		<ButtonBase
			className="note"
			onClick={() => onNoteClick()}
		>
			<Card className="note-content">
				<div className="note-text">
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
				<div className="note-likes">
					<Icon
						component={FavoriteIcon}
						color="warning"
					/>
					<Typography>{props.upvotes}</Typography>
					<Icon
						component={ArrowForwardIosIcon}
						color="primary"
					/>
				</div>
			</Card>
		</ButtonBase>
	);
}

export { Note };