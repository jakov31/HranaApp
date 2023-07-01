import react, { useContext, useEffect, useState } from "react";
import kontekst from "../../store/cart-kontekst";
import CartIcon from "../Cart/CartIcon";
import stilovi from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [dugmirano, setDugmirano] = useState(false);

  const ctx = useContext(kontekst);

  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const dugmeStilovi = `${stilovi.button} ${dugmirano ? stilovi.bump : ""}`;

const {items} = ctx;

  useEffect(() => {
    if (ctx.items.length === 0) {
      return
    }
    setDugmirano(true);

    const timer = setTimeout(() => {
      setDugmirano(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }



  }, [items]);

  return (
    <button className={dugmeStilovi} onClick={props.onClick}>
      <span className={stilovi.icon}>
        <CartIcon />
      </span>
      <span>Korpa</span>
      <span className={stilovi.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
