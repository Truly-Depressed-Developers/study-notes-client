import { Typography } from "@mui/material";

type Props = {}

const NotFound = (props: Props): JSX.Element => {
    return (
        <div>
            <Typography
                variant="h2"
            >
                Nie znaleziono strony
            </Typography>
        </div>
    );
}

export { NotFound };