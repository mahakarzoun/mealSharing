import React, { useState } from "react";

import "./reservationForm.css";
function ReservationForm({ createReservation }) {
  const path = document.location.href.split("/");
  const mealId = path[path.length - 1];
  const [reservation, setReservation] = useState({
    id: "?", //increment in database
    number_of_guests: "",
    meal_id: mealId,
    created_date: "", //defualt now
    contact_phonenumber: "",
    contact_name: "",
    contact_email: "",
  });

  const submit = (event) => {
    debugger;
    event.preventDefault();
    const request = {};
    Array.from(event.currentTarget.form.querySelectorAll("input")).forEach(
      (input) => {
        const key = input.id;
        const value = input.value;
        request[key] = value;
      }
    );
    createReservation(request);
  };
  return (
    <form>
      <label>name</label>
      <input type="text" id="name" required></input>
      <label>email</label>
      <input type="email" id="email" required></input>
      <label>phone number</label>
      <input type="tel" id="phoneNr" required></input>
      <label>number of guests</label>
      <input type="number" min={1} id="nrGuests" required></input>
      <button type="submit" onClick={submit}>
        book a seat
      </button>
    </form>
  );
}

export default ReservationForm;
