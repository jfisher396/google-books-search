import React, { Component } from "react";
import axios from "axios";
import API from "../utils/API"

export default class SavedBook extends Component {
    state = {
        books: [],
    };
    componentDidMount() {
        this.bookApi()
    }
    bookApi(){
        axios.get("/api/books")
            .then((response) => {
               return this.setState({ books: response.data })});
    }

    handleButtonClick = (id) => {
        API.deleteBook(id)
            .then(this.bookApi())
        
    }

    render() {
        const { books } = this.state;
        return (
            <>
                <div className="table-div">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Cover</th>
                                <th scope="col" className="hide">Title</th>
                                <th scope="col" className="hide">Author(s)</th>
                                <th scope="col" className="hide">Description</th>
                                <th scope="col">View on Google Books Site</th>
                                <th scope="col">Remove from list</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((item) => {
                                console.log(item)
                                return (
                                    <tr key={item._id}>
                                        <td><img src={item.image} alt={item.title} /></td>
                                        <td className="hide">{item.title}</td>
                                        <td className="hide">{item.authors}</td>
                                        <td className="description hide"><div className="tableData">{item.description}</div></td>
                                        <td><a className="btn btn-info mt-3" href={item.link} target="_blank" rel="noopener noreferrer">Google Books</a></td>
                                        <td><button onClick={()=>this.handleButtonClick(item._id)} className="btn btn-primary mt-3">Remove</button></td>
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