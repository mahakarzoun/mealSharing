import React, { useState, useEffect } from "react";
import "./reservation.css";
import ReservationForm from "../../components/reservation-form/reservationForm";

function Reservations() {
  const SERVER_URL = "http://localhost";
  const SERVER_PORT = 5000;
  const ENDPOINT = {
    meals: "api/meals",
    reservation: "api/reservation",
  };
  const [meal, setMeal] = useState({});
  const [reserveMode, setMode] = useState(false);

  function getMealId() {
    const path = document.location.href.split("/");
    return path[path.length - 1];
  }
  function fetchMealById() {
    fetch(`${SERVER_URL}:${SERVER_PORT}/${ENDPOINT.meals}/${getMealId()}`).then(
      (res) => res.json().then((data) => setMeal(data))
    );
  }

  const submitReservation = (request) => {
    debugger;
    request["created_date"] = new Date();
    request["meal_id"] = getMealId();
    fetch(`${SERVER_URL}:${SERVER_PORT}/${ENDPOINT.reservation}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).then((res) =>
      res.json().then((data) => {
        setMode(false);
        fetchMealById();
      })
    );
  };
  useEffect(() => {
    fetchMealById();
  }, []);

  return (
    <div>
      <img src={meal.image} />
      {reserveMode ? (
        <ReservationForm createReservation={submitReservation} />
      ) : (
        <div>
          <h2>{meal.title}</h2>
          <h3>{meal.description}</h3>
          <p>location:{meal.location}</p>
          <p>when: {meal.when}</p>
          <p>max_reservations: {meal.max_reservations}</p>
          <p>price :{`${meal.price} kr`} </p>
          <button onClick={setMode.bind(true)}>reserve</button>
        </div>
      )}
    </div>
  );
}

export default Reservations;
