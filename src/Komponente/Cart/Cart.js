import react, { useContext } from "react";
import kontekst from "../../store/cart-kontekst";
import Modal from "../UI/Modal";

import stilovi from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(kontekst);

  const totalniAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const imaProizvoda = ctx.items.length > 0;

  const cartItemAddHandler = (item) => {
    ctx.addItem(item)
  }

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id)
  }

  const cartItems = (
    <ul className={stilovi["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClick={props.onSakrijKorpu}>
      {cartItems}
      <div className={stilovi.total}>
        <span>Ukupno</span>
        <span>{totalniAmount}</span>
      </div>
      <div className={stilovi.actions}>
        <button
          className={stilovi["button--alt"]}
          onClick={props.onSakrijKorpu}
        >
          Zakapijaj
        </button>
        {imaProizvoda && <button className={stilovi.button}>Poruchi ga</button>}
      </div>
    </Modal>
  );
};

export default Cart;
