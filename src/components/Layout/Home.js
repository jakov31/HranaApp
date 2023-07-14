import { Fragment } from "react";
import Header from "./Header";
import Meals from "../Meals/Meals";

const Home = (props) => {
  return (
    <Fragment>
      <Header onShowCart={props.showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
};

export default Home;
