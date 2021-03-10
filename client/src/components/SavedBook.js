import React, { Component } from "react";
import axios from "axios";
import API from "../utils/API"

export default class SavedBook extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
    this.state = {
      books: [],
    };
  }

  //renders the books list from the database upon page load
  componentDidMount() {
    this.bookApi();
  }

  //makes a call to the books API
  bookApi() {
    axios
      .get("/api/books")
      .then((response) => {
        console.log("book API response:", response.data);
        return this.setState({ books: response.data });
      })
      .catch((err) => console.log(err));
  }

  //updates API info when book has been deleted

  //deletes book from db
  handleDeleteBook = (id) => {
    API.deleteBook(id)
    
    const newBooks = this.state.books.filter(book => book._id !== id);
    this.setState({books: newBooks})

    console.log("remove button clicked", this.state.books);
  };

  render() {
    const { books } = this.state;
    return (
      <>
        <div className="table-div">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="hide">
                  Cover
                </th>
                <th scope="col" className="hide">
                  Title
                </th>
                <th scope="col" className="hide">
                  Author(s)
                </th>
                <th scope="col" className="hide">
                  Description
                </th>
                <th scope="col" className="hide"></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                return (
                  <tr key={book._id}>
                    <td>
                      <img
                        className="cover"
                        src={book.image}
                        alt={book.title}
                      />
                    </td>
                    <td className="hide td">{book.title}</td>
                    <td className="hide td">{book.authors}</td>
                    <td className="description hide td">
                      <div className="tableData">{book.description}</div>
                    </td>
                    <td className="td">
                      <a
                        className="btn btn-info list-button"
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Books
                      </a>
                      <button
                        onClick={() => this.handleDeleteBook(book._id)}
                        className="btn btn-primary list-button"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}