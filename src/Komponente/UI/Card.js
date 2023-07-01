import react from "react";
import stilovi from "./Card.module.css"

const Card = (props) => {
    return <div className={stilovi.card}>{props.children}</div>
}


export default Card