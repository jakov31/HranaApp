import { useRef, useState } from "react";
import stilovi from "./Poruchivnica.module.css";

const isEmpty = (values) => values.trim() === "";
const is9carLong = (values) => values.trim().length === 9;

const Poruchivnica = (props) => {
  const [formIsValid, setFormIsValid] = useState({
    ime: true,
    grad: true,
    ulica: true,
    broj: true,
  });

  

  const imeInputRef = useRef();
  const ulicaInputRef = useRef();
  const brojInputRef = useRef();
  const gradInputRef = useRef();

  const slanjePodatakaHandler = (event) => {
    event.preventDefault();
    

    const imeUpisano = imeInputRef.current.value;
    const ulicaUpisano = ulicaInputRef.current.value;
    const brojUpisano = brojInputRef.current.value;
    const gradUpisano = gradInputRef.current.value;

    const imeValidno = !isEmpty(imeUpisano);
    const ulicaValidno = !isEmpty(ulicaUpisano);
    const brojValidno = is9carLong(brojUpisano);
    const gradValidno = !isEmpty(gradUpisano);

    setFormIsValid({
      ime: imeValidno,
      grad: gradValidno,
      ulica: ulicaValidno,
      broj: brojValidno,
    });

    const formValidnost =
      imeValidno && ulicaValidno && brojValidno && gradValidno;

    if (!formValidnost) {
      return;
    }

    props.onNaruci({
        ime: imeUpisano,
        ulica: ulicaUpisano,
        broj: brojUpisano,
        grad: gradUpisano
    })
  };

  return (
    <form className={stilovi.form} onSubmit={slanjePodatakaHandler}>
      <div className={stilovi.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={imeInputRef} />
        {!formIsValid.ime && <p>Upisite ispravno ime</p>}
      </div>
      <div className={stilovi.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={ulicaInputRef} />
        {!formIsValid.ulica && <p>Upisite ispravno ulicu</p>}
      </div>
      <div className={stilovi.control}>
        <label htmlFor="num">Phone number</label>
        <input type="text" id="num" ref={brojInputRef} />
        {!formIsValid.broj && <p>Upisite ispravno broj(9 karaktera)</p>}
      </div>
      <div className={stilovi.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={gradInputRef} />
        {!formIsValid.grad && <p>Upisite ispravno grad</p>}
      </div>
      <div className={stilovi.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={stilovi.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Poruchivnica;
