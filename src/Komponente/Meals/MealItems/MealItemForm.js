import { useRef } from "react";
import Input from "../../UI/Input";
import stilovi from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const kolichinaInputaRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const upisanaKolichina = kolichinaInputaRef.current.value;
    const upisanaKolichinaBroj = +upisanaKolichina;
    console.log(upisanaKolichinaBroj);

    if (
      upisanaKolichina.trim().lenght === 0 ||
      upisanaKolichinaBroj === 0 ||
      upisanaKolichinaBroj > 7
    ) {
      return;
    }

    props.onAddToCart(upisanaKolichinaBroj);
  };

  return (
    <form className={stilovi.form} onSubmit={submitHandler}>
      <Input
        ref={kolichinaInputaRef}
        label="Kolichina"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "7",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Dodajga</button>
    </form>
  );
};

export default MealItemForm;
