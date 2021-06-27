const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    const allReviews = await knex("reviews");
    let filteredReviews = allReviews;
    if ("title" in request.query) {
      const title = request.query.title;
      filteredReviews = await knex("reviews").where(
        "title",
        "like",
        `%${title}%`
      );
      if (filteredReviews.length === 0) {
        if (typeof parseInt(title) == "number") {
          response.status(400).json({ error: " meal title must be a string " });
        } else {
          response.status(404).json({
            error: `cant find a review with title ${title}  `,
          });
        }
      } else {
        response.send(allReviews);
      }
    }
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const selectReviewsById = await knex("reviews").where("id", id);
    if (isNaN(id)) {
      response.status(400).json({ error: "id must be an integer " });
    } else if (selectReviewsById.length === 0) {
      response.status(404).json({ error: "id not found" });
    } else {
      response.send(selectReviewsById);
    }
  } catch (error) {
    throw error;
  }
});

router.post("/:id", async (request, response) => {
  try {
    const addReviewById = await knex("reviews").insert(request.body);
    response.send(addReviewById);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    const id = parseInt(request.params.id);
    const selectReviewById = await knex("reviews")
      .where("id", id)
      .update(request.body);
    response.send(selectReviewById);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const selectReviewById = await knex("reviews").where("id", id).del();
    response.send(selectReviewById);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
