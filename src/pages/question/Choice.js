import React, { useState } from "react";
import { RichText } from "prismic-reactjs";

const Choice = ({ element }) => {
  const { primary, items } = element;

  const [response, setResponse] = useState(null);

  const handleText = (text, index) => {
    const multipleChoice = primary.typeofchoice;
    if (multipleChoice) {
      setResponse({ ...response, [index]: text });
    } else {
      setResponse({ 0: text });
    }
  };

  console.log(response);

  return (
    <div className="choice">
      <h3>{RichText.asText(primary.question)}</h3>
      {items.map((item, index) => (
        <p>
          <button key={index} onClick={() => handleText(item.option, index)}>
            {RichText.asText(item.option)}
          </button>
        </p>
      ))}
    </div>
  );
};

export default Choice;
