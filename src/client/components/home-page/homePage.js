import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Meals from "../../containers/meals/meals";
import Reservations from "../../containers/reservations/reservation";
import "./homePage.css";
function HomePage() {
  return (
    <div className="homePage">
      <Switch>
        <Route exact path="/meals" component={Meals} />
        <Route exact path="/meals/:id" component={Reservations}></Route>
        <Route>
          <Redirect to="meals"></Redirect>
        </Route>
      </Switch>
    </div>
  );
}

export default HomePage;
