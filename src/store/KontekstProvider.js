import { useReducer } from "react";
import kontekst from "./cart-kontekst";

const InicijalnoStanje = {
  items: [],
  totalAmount: 0,
};

const ReducerFunkcija = (state, action) => {
  if (action.type === "DODAJ") {
    const noviAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const postojechiProizvodaIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const postojechiProizvod = state.items[postojechiProizvodaIndex];

    let updatedItems;

    if (postojechiProizvod) {
      const updatedItem = {
        ...postojechiProizvod,
        amount: postojechiProizvod.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[postojechiProizvodaIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: noviAmount,
    };
  }
  if (action.type === "MAKNI") {
    const postojechiProizvodaIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const postojechiProizvod = state.items[postojechiProizvodaIndex]
      const updatedAmount = state.totalAmount - postojechiProizvod.price;
      let updatedItems
      if(postojechiProizvod.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== action.id)
      } else {
        const updatedItem = {...postojechiProizvod, amount: postojechiProizvod.amount - 1};
        updatedItems = [...state.items];
        updatedItems[postojechiProizvodaIndex] = updatedItem
      };
      return {
        items: updatedItems,
        totalAmount: updatedAmount
      }
  }

  if (action.type === "OCISTI") {
    return InicijalnoStanje
  }

  return InicijalnoStanje
};

const KontekstProvider = (props) => {
  const [treStanje, dispatch] = useReducer(ReducerFunkcija, InicijalnoStanje);

  const dodajArtikal = (item) => {
    dispatch({ type: "DODAJ", item: item });
  };

  const makniArtikal = (id) => {
    dispatch({ type: "MAKNI", id: id });
  };

  const ocistiKartu = () => {
    dispatch({ type: "OCISTI" })
  }

  const kontekstVrijednost = {
    items: treStanje.items,
    totalAmount: treStanje.totalAmount,
    addItem: dodajArtikal,
    removeItem: makniArtikal,
    clearKartu:  ocistiKartu,
  };

  return (
    <kontekst.Provider value={kontekstVrijednost}>
      {props.children}
    </kontekst.Provider>
  );
};

export default KontekstProvider;
