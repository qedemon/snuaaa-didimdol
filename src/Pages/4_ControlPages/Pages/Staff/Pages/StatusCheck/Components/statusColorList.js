import CongratualtionBackground from "../Assets/CongratulationBackground.svg";

const baseColor = {
    color: "black",
    "&.selected":{
        color: "var(--white)"
    } 
}
const statusColorList = {
    "적": {...baseColor, background: "#F17233"},
    "황": {...baseColor, background: "#F5B538"},
    "녹": {...baseColor, background: "#34D0D5"},
    "회": {...baseColor, background: "var(--dark-gray)"},
    "인준": {
        ...baseColor,
        background: "#E5EFF0",
        backgroundImage: `url(${CongratualtionBackground})`,
        "&.selected":{
            color: "var(--white)",
            textShadow: "-1px 0px black, 1px 0px black, 0px 1px black, 0px -1px black"
        } 
    }
}

export default statusColorList;