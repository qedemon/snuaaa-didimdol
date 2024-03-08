import {Background} from "../../../../Components";
import { ReactComponent as UpperLeft } from "../Assets/UpperLeft.svg";
import { ReactComponent as UpperRight } from "../Assets/UpperRight.svg";

export default Background(
    [
        {
            components: UpperLeft,
            position: Background.Positions.Upper.Left
        },
        {
            components: UpperRight,
            position: Background.Positions.Upper.Right
        }
    ]
);