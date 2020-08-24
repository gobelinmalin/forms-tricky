import React, { useEffect, useState } from "react";
import { RichText } from "prismic-reactjs";
import { client, linkResolver } from "../prismic-configuration";
import Slider from "react-slick";


import NotFound from "./NotFound";
import Note from "./question/Note";
import Choice from "./question/Choice";
import Matrix from "./question/Matrix";

import "../assets/css/page.css"

const Page = ({ match }) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);

  const uid = match.params.uid;

  // Get the page document from Prismic
  useEffect(
    () => {
      const fetchData = async () => {
        // We are using the function to get a document by its UID
        const result = await client.getByUID("page", uid);

        if (result) {
          // We use the State hook to save the document
          return setDocData(result);
        } else {
          // Otherwise show an error message
          console.warn("Page document not found. Make sure it exists in your Prismic repository");
          toggleNotFound(true);
        }
      };
      fetchData();
    },
    [uid]
  ); // Skip the Effect hook if the UID hasn't changed

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (doc) {
    return (
      <div className="page">
        {/* This is how to render a Rich Text field as plain text */}
        <h1>{RichText.asText(doc.data.title)}</h1>
        {/* This is how to render a Rich Text field into your template as HTML */}
        <h2>
          <RichText render={doc.data.description} linkResolver={linkResolver} />
        </h2>
        <div className="page-content">
          <Slider {...settings}>
            {doc.data.body.map((type) => {
              const slice = type.slice_type;
              console.log(type);
              switch (slice) {
                case "note":
                  return <Note element={type} />;
                  break;
                case "text":
                  return <Choice element={type} />;
                  break;
                case "matrix":
                  return <Matrix element={type} />;
                  break;
                default:
                  return "Pas de container associé trouvé";
              }
            })}
          </Slider>
        </div>
      </div>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Page;
