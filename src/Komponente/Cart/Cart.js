import react, { Fragment, useContext, useState } from "react";
import kontekst from "../../store/cart-kontekst";
import Modal from "../UI/Modal";

import stilovi from "./Cart.module.css";
import CartItem from "./CartItem";
import Poruchivnica from "./Poruchivnica";

const Cart = (props) => {
  const ctx = useContext(kontekst);
  const [poruchenoKlik, setPoruchenoKlik] = useState(false);
  const [porucivanje, setPorucivanje] = useState(false);
  const [porucenoUspjesno, setPorucenoUspjesno] = useState();

  const totalniAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const imaProizvoda = ctx.items.length > 0;

  const cartItemAddHandler = (item) => {
    ctx.addItem(item);
  };

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

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

  const naruchiHandler = () => {
    return setPoruchenoKlik(true);
  };

  const slanjeNarucenogHandler = async (userData) => {
    setPorucivanje(true);

    await fetch(
      "https://hranaapp-8abbf-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          order: ctx.items,
        }),
      }
    );
    setPorucenoUspjesno(true);
    ctx.clearKartu();
  };

  const zatvaranjePorucenja = () => {
    setPoruchenoKlik(false)
  }

  const kontekstKarte = (
    <Fragment>
      {cartItems}
      <div className={stilovi.total}>
        <span>Ukupno</span>
        <span>{totalniAmount}</span>
      </div>
      <div className={stilovi.actions}>
        {!poruchenoKlik && <button
          className={stilovi["button--alt"]}
          onClick={props.onSakrijKorpu}
        >
          Zakapijaj
        </button>}
        {imaProizvoda && !poruchenoKlik && (
          <button onClick={naruchiHandler} className={stilovi.button}>
            Poruchi ga
          </button>
        )}
        {poruchenoKlik && <Poruchivnica onCancel={zatvaranjePorucenja} onNaruci={slanjeNarucenogHandler} />}
      </div>
    </Fragment>
  );

  const porucenoKontent = (
    <Fragment>
      <p>Uspjesno poruceno. Prijatno.</p>
      <div className={stilovi.actions}>
        <button className={stilovi.button} onClick={props.onSakrijKorpu}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClick={props.onSakrijKorpu}>
      {!porucivanje && !porucenoUspjesno && kontekstKarte}
      {porucivanje && !porucenoUspjesno && <p>Slanje porudzbine...</p>}
      {porucenoUspjesno && porucenoKontent}
    </Modal>
  );
};

export default Cart;
