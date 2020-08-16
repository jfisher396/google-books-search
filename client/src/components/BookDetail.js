import React from "react";

function BookDetail(props) {
  return (
    <div className="text-center">
      <img alt={props.title} className="img-fluid" src={props.src} style={{ margin: "0 auto" }} />
      <h3>Author(s): {props.authors}</h3>
      <h4>Description: {props.description}</h4>
      <a href={props.previewLink}>Link to book</a>
    </div>
  );
}

export default BookDetail;
