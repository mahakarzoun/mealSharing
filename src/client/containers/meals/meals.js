import React, { useState, useEffect } from "react";
import Meal from "../../components/meal/meal";
import "./meals.css";

function Meals() {
  const SERVER_URL = "http://localhost";
  const SERVER_PORT = 5000;
  const ENDPOINT = {
    meals: "api/meals",
  };
  const [meals, setMeals] = useState([]);
  const [searchParam, setParam] = useState("");
  useEffect(() => {
    fetch(`${SERVER_URL}:${SERVER_PORT}/${ENDPOINT.meals}`).then((res) =>
      res.json().then((data) => setMeals(data))
    );
  }, []);

  const filteredMeals = meals.filter((meal) =>
    meal.title.includes(searchParam)
  );
  return (
    <div>
      <div className="search">
        <input placeholder="search for a meal"></input>
        <div className="mealsList">
          {filteredMeals.map((meal) => (
            <Meal key={meal.id} data={meal} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Meals;
