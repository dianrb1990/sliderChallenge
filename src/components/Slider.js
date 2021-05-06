import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import { Next, Previous } from "grommet-icons";
import { Box, Text, Button } from "grommet";

const Slider = (props) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [sizeCards, setSizeCards] = useState(0);
  const slider = useRef(null);
  const cardContainerRef = useRef(null);

  const leftArrowRef = useRef(null);
  const [leftArrowEnable, setLeftArrowEnable] = useState(false);
  const [leftArrowHidden, setLeftArrowHidden] = useState(false);

  const rightArrowRef = useRef(null);
  const [rightArrowEnable, setRightArrowEnable] = useState(false);
  const [rightArrowHidden, setRightArrowHidden] = useState(false);

  const step = props.stepWidth;

  useEffect(() => {
    const cardContainerWidth = slider.current.offsetWidth;
    let elementsWidth = 0;
    const elements = cardContainerRef.current.children;
    for (let index = 0; index < elements.length; index++) {
      const element = elements[index];
      var integer = parseInt(element.offsetWidth, 10);
      let marginLeft = parseInt(element.style.marginLef, 10) || 0;
      let marginRight = parseInt(element.style.marginRight, 10) || 0;
      elementsWidth = elementsWidth + integer + marginLeft + marginRight;
    }

    let totalSizeCards = Math.ceil(elementsWidth / step);
    setSizeCards(totalSizeCards);

    if (cardContainerWidth > elementsWidth) {
      setLeftArrowHidden(true);
      setRightArrowHidden(true);
    }

    if (currentCard < totalSizeCards - 2) {
      // alert(currentCard + " of " + totalSizeCards);
      rightArrowRef.current.disabled = false;
      setRightArrowEnable(false);
    } else {
      rightArrowRef.current.disabled = true;
      setRightArrowEnable(true);
    }

    if (currentCard > 0) {
      leftArrowRef.current.disabled = false;
      setLeftArrowEnable(false);
    } else {
      leftArrowRef.current.disabled = true;
      setLeftArrowEnable(true);
    }
  }, [currentCard]);

  const handle_next = () => {
    if (currentCard < sizeCards) {
      setCurrentCard(currentCard + 1);
      cardContainerRef.current.style.transitionDuration = "0.5s";
      cardContainerRef.current.style.transform = `translate(-${
        props.stepWidth * (currentCard + 1)
      }px)`;
    } else {
      rightArrowRef.current.disabled = true;
    }
  };

  const handle_previous = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      cardContainerRef.current.style.transitionDuration = "0.5s";
      cardContainerRef.current.style.transform = `translate(-${
        props.stepWidth * (currentCard - 1)
      }px)`;
    } else {
      leftArrowRef.current.disabled = true;
    }
  };

  return (
    <Box justify="center" align="center" style={{ position: "relative" }}>
      <Text size="3xl">{props.title}</Text>
      {leftArrowHidden ? null : (
        <Button
          icon={props.previous ? props.previous : <Previous />}
          ref={leftArrowRef}
          onClick={() => handle_previous()}
          style={styles.left_arrow}
          disabled={leftArrowEnable}
        />
      )}
      {rightArrowHidden ? null : (
        <Button
          icon={<Next />}
          icon={props.next ? props.next : <Next />}
          ref={rightArrowRef}
          onClick={() => handle_next()}
          style={styles.right_arrow}
          disabled={rightArrowEnable}
          visible={false}
        />
      )}
      <Box style={styles.slider} ref={slider}>
        <div
          ref={cardContainerRef}
          className="card_container"
          style={styles.card_container}
        >
          <Card card_number={0} />
          <Card card_number={1} />
          <Card card_number={2} />
          <Card card_number={3} />
          <Card card_number={4} />
          <Card card_number={5} />
          <Card card_number={6} />
        </div>
      </Box>
    </Box>
  );
};

const styles = {
  slider: {
    transform: "translate(0%, 0%)",
    width: window.innerWidth * 0.8,
    overflow: "hidden",
  },
  card_container: {
    display: "flex",
    flexDirection: "row",
    width: "fit-content",
  },
  left_arrow: {
    position: "absolute",
    left: -50,
    top: "50%",
    zIndex: 10,
  },
  right_arrow: {
    position: "absolute",
    right: -50,
    zIndex: 10,
    top: "50%",
  },
};

export default Slider;
