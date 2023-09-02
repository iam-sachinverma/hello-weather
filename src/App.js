import React, { useEffect } from "react";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import PageHome from "./containers/PageHome/PageHome";
import MyThreeJSComponent from "./components/Earth/Earth";

function App() {
  return (
    <>
      <Header />

      <PageHome />

      <MyThreeJSComponent />

      <Footer />
    </>
  );
}

export default App;
