import React, { Component } from "react";
import API from "../utils/API";
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";
import BookDetail from "../components/BookDetail";

class Books extends Component {
  state = {
    result: {},
    search: "",
  };

  componentDidMount() {
    this.searchBooks("Johnny Got His Gun");
  }

  searchBooks = (query) => {
    API.search(query)
      .then((res) => {
        // console.log(res.data.items[0].volumeInfo)
        this.setState({ result: res.data.items[0].volumeInfo });
      })
      .catch((err) => console.log(err));
  };

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

  handleButtonClick = (event) => {
    event.preventDefault();
    API.saveBook({
      title: this.state.result.title,
      authors: this.state.result.authors.join(", "),
      description: this.state.result.description,
      image: this.state.result.imageLinks.smallThumbnail,
      link: this.state.result.previewLink,
    }).catch((err) => console.log(err));
  };
  //

  render() {
    return (
      <div className="container">
        <Card heading="Search">
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
              handleButtonClick={this.handleButtonClick}
            />
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Card>
      </div>
    );
  }
}

export default Books;
