import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";
import BookDetail from "../components/BookDetail";

class Books extends Component {
  state = {
    result: {},
    search: "",
  };

  componentDidMount() {
    this.searchBooks("The Hobbit");
  }

  searchBooks = (query) => {
    API.search(query)
    // console.log(response)
      .then((res) => this.setState({ result: res.data }))
      
      .catch((err) => console.log(err));
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.searchBooks(this.state.search);
  }
  // 

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-8">
            <Card
              heading={this.state.result.Title || "Search for a Book to Begin"}
            >
              {this.state.result.Title ? (
                <BookDetail
                  title={this.state.result.Title}
                  src={this.state.result.Poster}
                  director={this.state.result.Director}
                  genre={this.state.result.Genre}
                  released={this.state.result.Released}
                />
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Card>
          </Col>
          <Col size="md-4">
            <Card heading="Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
