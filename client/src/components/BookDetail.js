import React from "react";


function BookDetail(props) {
  return (
    <div className="text-center">
      <img alt={props.title} className="img-fluid mb-3" src={props.src} style={{ margin: "0 auto" }} />
      <h3 id="author">Author(s): {props.authors}</h3>
      <p>Description: {props.description}</p>
      <a href={props.link} target="_blank" rel="noopener noreferrer" className="btn btn-success mt-3">View book in Google Books</a>
      <br />
      <button onClick={props.handleButtonClick} className="btn btn-info mt-3" href="/reading-list">Save book to reading list</button>
    </div>
  );
}

export default BookDetail;
