import { Typography } from "@mui/material";

type Props = {}

const Home = (props: Props): JSX.Element => {
    return (
        <div>
            <Typography
                variant="h1"
            >
                Sheep Your Hack 4
            </Typography>

            <Typography
                variant="subtitle1"
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, voluptate?
            </Typography>
        </div>
    );
}

export { Home };