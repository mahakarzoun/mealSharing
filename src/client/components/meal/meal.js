import "./meal.css";
import React from "react";
import { Link } from "react-router-dom";
function Meal({ data }) {
  return (
    <div className="meal">
      <Link to={`/meals/${data.id}`}>
        <img src={data.image} />
        <h2>{data.title}</h2>
        <h3>{data.description}</h3>
      </Link>
    </div>
  );
}

export default Meal;
