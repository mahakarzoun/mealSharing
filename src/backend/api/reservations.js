const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    const allReservations = await knex("reservations");
    let filteredReservations = allReservations;
    if ("title" in request.query) {
      const title = request.query.title;
      filteredReservations = await knex("reservations").where(
        "title",
        "like",
        `%${title}%`
      );
      if (filteredReservations.length === 0) {
        if (typeof parseInt(title) == "number") {
          response.status(400).json({ error: " meal title must be a string " });
        } else {
          response.status(404).json({
            error: `cant find a reservation with title ${title}  `,
          });
        }
      } else {
        response.send(filteredReservations);
      }
    }
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const selectReservationsByIdReservationById = await knex(
      "reservations"
    ).where("id", id);
    if (isNaN(id)) {
      response.status(400).json({ error: "id must be an integer " });
    } else if (selectReservationsByIdReservationById.length === 0) {
      response.status(404).json({ error: "id not found" });
    } else {
      response.send(selectReservationsByIdReservationById);
    }
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    console.log("reservation request =  " + request.body);

    const meal_id = request.body.meal_id;
    const meal = await knex("meals").where({ id: meal_id });

    // check if meal_id exsited .
    if (meal.length != 1) {
      console.log("meal id " + meal_id + "not found ");
      return response.sendStatus(400).send("meal id " + meal_id + "not found ");
    }

    // check if the available meals more or equal than the requested meals .
    if (meal.max_reservations < request.body.number_of_guests) {
      console.log(
        "remaining quantity is not suffecient " + meal.max_reservations
      );
      return response
        .sendStatus(412)
        .send("remaining quantity is not suffecient ");
    }

    const addedReservation = await knex("reservations").insert(request.body);
    await knex("meals").update({
      max_reservations: meal.max_reservations - request.body.number_of_guests,
    });

    response.send(addedReservation);
  } catch (error) {
    throw error;
  }
});

router.post("/:id", async (request, response) => {
  try {
    const addReservationById = await knex("reservations").insert(request.body);
    response.send(addReservationById);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const selectReservationById = await knex("reservations")
      .where("id", id)
      .del();
    response.send(selectReservationById);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
