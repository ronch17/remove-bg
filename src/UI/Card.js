import React from "react";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={`${props.divSide ? classes.left_div : classes.right_div}`}>
      {props.children}
    </div>
  );
};

export default Card;
