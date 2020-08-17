import React, { Component } from "react";
import axios from "axios";
import API from "../utils/API"

export default class SavedBook extends Component {
    state = {
        books: [],
    };
    componentDidMount() {
        axios.get("/api/books")
            .then((response) => this.setState({ books: response.data }));
    }

    handleButtonClick = (event) => {
        event.preventDefault();
        console.log(this.state.books)
        API.deleteBook()
            .catch(err => console.log(err))
    }

    render() {
        const { books } = this.state;
        return (
            <>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Cover</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author(s)</th>
                                <th scope="col">Description</th>
                                <th scope="col">View on Google Books Site</th>
                                <th scope="col">Remove from list</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td><img src={item.image} alt={item.title} /></td>
                                        <td>{item.title}</td>
                                        <td>{item.authors}</td>
                                        <td>{item.description}</td>
                                        <td><a className="btn btn-info mt-3" href={item.link} target="_blank" rel="noopener noreferrer">Google Books</a></td>
                                        <td><button onClick={this.handleButtonClick} className="btn btn-primary mt-3">Remove</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}