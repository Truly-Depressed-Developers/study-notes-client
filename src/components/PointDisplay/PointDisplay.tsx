import "./PointDisplay.scss";
import StarCircle from "./StarCircle";

type Props = {}

const PointDisplay = (props: Props): JSX.Element => {
    return (
        <div className="point-display">
            <StarCircle />
            <span>2137</span>
        </div>
    );
}

export { PointDisplay };