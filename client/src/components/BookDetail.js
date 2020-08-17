import React from "react";
import { Link } from 'react-router-dom'

function BookDetail(props) {
  return (
    <div className="text-center">
      <img alt={props.title} className="img-fluid" src={props.src} style={{ margin: "0 auto" }} />
      <h3>Author(s): {props.authors}</h3>
      <h4>Description: {props.description}</h4>
      <a href={props.link} target="_blank" rel="noopener noreferrer" className="btn btn-success mt-3">View book in Google Books</a>
      <br />
      <button onClick={props.handleButtonClick} className="btn btn-info mt-3" href="/reading-list">Save book to reading list</button>
    </div>
  );
}

export default BookDetail;
