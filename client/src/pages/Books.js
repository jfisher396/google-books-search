import React, { Component } from "react"
import axios from 'axios'


  export default class Books extends Component {
  state = {
    title: "",
    authors: "",
    description: "",

  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.state.title).then(data => {
      console.log(data.data.items[0].volumeInfo.authors);
      this.setState({
        title: "",
        authors: "",
        description: ""
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Search Component</h1>
        <form>
          <input type="text" name="title" placeholder="title to search" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
          <button onClick={this.handleFormSubmit}>Search!</button>
        </form>
        <h1>{this.state.title}</h1>
      </div>
    )
  }
}