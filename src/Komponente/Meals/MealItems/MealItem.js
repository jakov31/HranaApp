

import { useContext } from "react"
import kontekst from "../../../store/cart-kontekst"
import stilovi from "./MealItem.module.css"
import MealItemForm from "./MealItemForm"


const MealItem = props => {
    const ctx = useContext(kontekst)

    const price = `$${props.price.toFixed(2)}`


    const addToCartHandler = (kolichina) => {
        ctx.addItem({
            id: props.id,
            name: props.imeproizvoda,
            amount: kolichina,
            price: props.price
        })
    }

    return <li className={stilovi.meal}>
        <div>
            <h3>{props.imeproizvoda}</h3>
            <div className={stilovi.description}>{props.opis}</div>
            <div className={stilovi.price}>{price}</div>
        </div>
        <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
        </div>
    </li>
}


export default MealItem