import React from "react";
import { RichText } from "prismic-reactjs";

const Note = ({ element }) => {
  const { primary } = element;
  const numberNote = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleNote = (note) => {
    console.log(note);
  };

  return (
    <div className="note">
      <h3>{RichText.asText(primary.question)}</h3>

      {numberNote.map((number, index) => (
        <button key={index} className="noteRounded" onClick={() => handleNote(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Note;
