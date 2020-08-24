import React from "react";
import { RichText } from "prismic-reactjs";
import Slider from "react-slick";

import '../../assets/css/matrix.css';


const Matrix = ({ element }) => {
  const { primary, items } = element;
  const listOfNotation = [1, 2, 3, 4];

  const handleNote = (questionNumber, noteNumber) => {
    console.log(questionNumber, noteNumber);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="matrix">
      <h3>{RichText.asText(primary.question)}</h3>
      <Slider {...settings}>
        {items.map((item, index) => {
          const numberOfQuestion = index + 1;
          const numberOfAllQuestion = items.length;
          return (
            <div className="matrix-container">
              <div className="matrix-content-question">
                <p>
                  Question {numberOfQuestion} / {numberOfAllQuestion}
                </p>
                <h4>{RichText.asText(item.question)}</h4>
              </div>
              <div className="maxtrix-options">
                  {listOfNotation.map((note) => <button onClick={() => handleNote(numberOfQuestion, note)}>{note}</button>)}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Matrix;
