const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    console.log(`fetching meals with params = ${request.query}`);
    if ("title" in request.query) {
      const title = request.query.title;
      const filteredMeals = await knex("meals").where(
        "title",
        "like",
        `%${title}%`
      );
      response.send(filteredMeals);
    }

    // max price query
    if ("maxPrice" in request.query) {
      const maxPrice = parseInt(request.query.maxPrice);
      if (isNaN(maxPrice)) {
        response.status(400).json({ error: "Max Price must be integer" });
      }
      const fillteredMeals = await knex("meals")
        .where("price", "<=", maxPrice)
        .orderBy("price", "desc");
      response.send(fillteredMeals);
    }
    // limit query
    if ("limit" in request.query) {
      const limit = parseInt(request.query.limit);
      if (isNaN(limit)) {
        response.status(400).json({ error: "limit must be a number " });
      }
      const fillteredMeals = await knex("meals").limit(limit);
      response.send(fillteredMeals);
    }
    // createdAfter query
    if ("createdAfter" in request.query) {
      let createdAfter = request.query.createdAfter;
      const fillteredMeals = await knex("meals").where(
        createdAfter,
        ">",
        "created_date"
      );
      response.send(fillteredMeals);
    }
    const allMeals = await knex("meals");
    response.send(allMeals);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    if (request.body.length > 0) {
      const addMeal = await knex("meals").insert(request.body);
      response.send(addMeal);
    }
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const selectMealById = await knex("meals").where("id", id);
    if (isNaN(id)) {
      response.status(400).json({ error: "id must be an integer " });
    } else if (selectMealById.length === 0) {
      response.status(404).json({ error: "id not found" });
    } else {
      const result = selectMealById[0];
      response.send(result);
    }
  } catch (error) {
    throw error;
  }
});

router.post("/:id", async (request, response) => {
  try {
    const addMealById = await knex("meals").insert(request.body);
    response.send(addMealById);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const selectMealById = await knex("meals")
      .where("id", id)
      .update(request.body);
    response.send(selectMealById);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const selectMealById = await knex("meals").where("id", id).del();
    response.send(selectMealById);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
