import { Typography } from "@mui/material";
import "./Home.scss"

type Props = {}

const Home = (props: Props): JSX.Element => {
    return (
        <div id="container">
            <div id="no-select">
                <div id="home-logo"></div>
                <Typography
                    variant="h1"
                >
                    Sheep Your Hack 4
                </Typography>

                <Typography
                    variant="subtitle1"
                    id="subtitle"
                >
                    2022
                </Typography>
            </div>
        </div>
    );
}

export { Home };