import "./meal.css";
import React from "react";
import { Link } from "react-router-dom";
function Meal({ data }) {
  return (
    <div className="meal">
      <img src={data.img} />
      <Link to={`/meals/${data.id}`}>
        <h2>{data.title}</h2>
      </Link>
    </div>
  );
}

export default Meal;
