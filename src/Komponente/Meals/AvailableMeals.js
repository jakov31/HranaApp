import react, { useEffect, useState } from "react";
import MealItem from "./MealItems/MealItem.js";
import stilovi from "./AvailableMeals.module.css";
import Card from "../UI/Card.js";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchMovies = async () => {
      const odgovor = await fetch(
        "https://hranaapp-8abbf-default-rtdb.firebaseio.com/meals.json"
      );

      if (!odgovor.ok) {
        throw new Error("Nesto je poslo po zlu...");
      }

      const dobijeniObjekt = await odgovor.json();

      const listaHraneSkup = [];

      for (const key in dobijeniObjekt) {
        listaHraneSkup.push({
          id: key,
          imeproizvoda: dobijeniObjekt[key].name,
          opis: dobijeniObjekt[key].description,
          price: dobijeniObjekt[key].price,
        });
      }

      setMeals(listaHraneSkup);
      setLoading(false);
    };

    fetchMovies().catch((error) => {
      setLoading(false);
      setIsError(error.message);
    });
  }, []);

  if (loading) {
    return (
      <section className={stilovi.loadinga}>
        <p>Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={stilovi.errora}>
        <p>{isError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      imeproizvoda={meal.imeproizvoda}
      price={meal.price}
      opis={meal.opis}
    />
  ));

  return (
    <section className={stilovi.meals}>
      <Card>{mealsList}</Card>
    </section>
  );
};

export default AvailableMeals;
