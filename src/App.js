import React, { useEffect } from "react";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import PageHome from "./containers/PageHome/PageHome";

function App() {
  return (
    <>
      <Header />

      <PageHome />

      <Footer />
    </>
  );
}

export default App;
