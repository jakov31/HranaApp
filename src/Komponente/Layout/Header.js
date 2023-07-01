import { Fragment } from "react"

import mealsImage from "../../assets/meals.jpg"
import stilovi from "./Header.module.css"
import HeaderCartButton from "./HeaderCartButton"


const Header = (props) => {
    return <Fragment>
        <header className={stilovi.header}>
            <h2>Kavasuki</h2>
            <HeaderCartButton onClick={props.onPrikaziKorpu} />
        </header>
        <div className={stilovi["main-image"]}>
            <img src={mealsImage} alt="Slika hrane mmm"/>
        </div>
    </Fragment>
}



export default Header   