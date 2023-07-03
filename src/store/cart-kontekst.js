import react, { createContext } from "react";


const kontekst = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearKartu: () => {}
})


export default kontekst