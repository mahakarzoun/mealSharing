import React from "react";
import HomePage from "./components/home-page/homePage";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div>
      <Header></Header>
      <HomePage />
      <Footer></Footer>
    </div>
  );
}

export default App;
