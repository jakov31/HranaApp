import react from "react";
import MealItem from "./MealItems/MealItem.js";
import stilovi from "./AvailableMeals.js";
import Card from "../UI/Card.js";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const meals = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      imeproizvoda={meal.name}
      price={meal.price}
      opis={meal.description}
    />
  ));

  return (
    <section className={stilovi.meals}>
      <Card>{meals}</Card>
    </section>
  );
};

export default AvailableMeals;
