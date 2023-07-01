

import { useState } from "react";
import Cart from "./Komponente/Cart/Cart";
import Header from "./Komponente/Layout/Header";
import Meals from "./Komponente/Meals/Meals";
import KontekstProvider from "./store/KontekstProvider";



function App() {

  const [prikazanaKorpa, setPrikazanaKorpa] = useState(false)

  const prikaziKorpuHandler = () => {
    setPrikazanaKorpa(true)
  }

  const sakrijKorpuHandler = () => {
    setPrikazanaKorpa(false)
  }


  return (
    <KontekstProvider>
      {prikazanaKorpa && <Cart onSakrijKorpu={sakrijKorpuHandler} />}
      <Header onPrikaziKorpu={prikaziKorpuHandler} />
      <Meals />
    </KontekstProvider>
  );
}

export default App;
