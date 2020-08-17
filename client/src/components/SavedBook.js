import React, { Component } from "react";
import axios from "axios";

export default class SavedBook extends Component {
    state = {
        books: [],
    };
    componentDidMount() {
        axios.get("/api/books")
            .then((response) => this.setState({ books: response.data }));
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
                                <th scope="col">Link to Google Books</th>
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
                                        <td><a href={item.link} target="_blank" rel="noopener noreferrer">Google Books</a></td>
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