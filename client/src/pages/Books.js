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
    
      .then((res) => {
        console.log(res.data.items[0].volumeInfo.previewLink)
      this.setState({ result: res.data.items[0].volumeInfo })
      })
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
              heading={this.state.result.title || "Search for a Book to Begin"}
            >
              {this.state.result.title ? (
                <BookDetail
                  title={this.state.result.title}
                  authors={this.state.result.authors}
                  src={this.state.result.imageLinks.smallThumbnail}
                  description={this.state.result.description}
                  link={this.state.result.previewLink}
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
