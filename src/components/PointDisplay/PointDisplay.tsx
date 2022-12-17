import "./PointDisplay.scss";
import StarCircle from "./StarCircle";

type Props = {
    amount: number
}

const PointDisplay = (props: Props): JSX.Element => {
    return (
        <div className="point-display">
            <StarCircle />
            <span>{props.amount}</span>
        </div>
    );
}

export { PointDisplay };