import React, { Component } from "react";
import API from "../utils/API";
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";
import BookDetail from "../components/BookDetail";
import SearchResults from "../components/SearchResults";

class Books extends Component {
  state = {
    result: {},
    search: "",
    results: [],
  };

  //Sets the default search upon page load
  componentDidMount() {
    this.searchBooks("The Hobbit");
  }

  //a function to run a search of the API based on customer input
  searchBooks = (query) => {
    API.search(query)
      .then((res) => {
        //sets the array of results to state
        this.setState({ results: res.data.items });
        //sets the first result object to state
        this.setState({ result: res.data.items[0].volumeInfo });
      }).catch((err) => console.log(err));
  };

  //
  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.searchBooks(this.state.search);
  };

  handleBookSave = (book) => {
    
    API.saveBook({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors.join(", "),
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.smallThumbnail,
      link: book.volumeInfo.infoLink,
    }).catch((err) => console.log(err));
  };
  //

  render() {
    
    const searchResults = this.state.results;
    // console.log(searchResults)
    return (

      <div className="container">
        <Card heading="Google Books Search">
          <SearchForm
            value={this.state.search}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        </Card>
        <Card heading={this.state.result.title || "Search for a Book to Begin"}>
          {this.state.result.title ? (
            <BookDetail
              title={this.state.result.title}
              authors={this.state.result.authors}
              src={this.state.result.imageLinks.smallThumbnail}
              description={this.state.result.description}
              link={this.state.result.previewLink}
              handleBookSave={this.handleBookSave}
            />
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Card>
        <SearchResults searchResults={searchResults} handleBookSave={this.handleBookSave}/>
      </div>
    );
  }
}

export default Books;
