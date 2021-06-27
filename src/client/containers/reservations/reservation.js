import React, { useState, useEffect } from "react";
import "./reservation.css";
import ReservationForm from "../../components/reservation-form/reservationForm";

function Reservations() {
  const SERVER_URL = "http://localhost";
  const SERVER_PORT = 5000;
  const ENDPOINT = {
    meals: "api/meals",
  };
  const [meal, setMeal] = useState({});
  const [reserveMode, setMode] = useState(false);

  function fetchMealById() {
    const path = document.location.href.split("/");
    const mealId = path[path.length - 1];
    fetch(`${SERVER_URL}:${SERVER_PORT}/${ENDPOINT.meals}/${mealId}`).then(
      (res) => res.json().then((data) => setMeal(data))
    );
  }

  function HandleSubmit(data) {}
  useEffect(() => {
    fetchMealById();
  }, []);

  return (
    <div>
      <img src={meal.image} />
      {reserveMode ? (
        <ReservationForm />
      ) : (
        <div>
          <h2>{meal.title}</h2>
          <h3>{meal.description}</h3>
          <p>location:{meal.location}</p>
          <p>when: {meal.when}</p>
          <p>max_reservations: {meal.max_reservations}</p>
          <p>price :{meal.price}</p>
          <button onClick={setMode.bind(true)}>reserve</button>
        </div>
      )}
    </div>
  );
}

export default Reservations;
