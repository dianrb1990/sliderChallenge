import React from "react";

const Card = (props) => {
  return <div style={styles.card}>{props.card_number}</div>;
};

const styles = {
  card: {
    width: "150px",
    backgroundColor: "blue",
    border: "2px solid black",
    boxSizing: "border-box",
    fontSize: "2.5em",
    color: "white",
    marginRight: "10px",
  },
};

export default Card;
