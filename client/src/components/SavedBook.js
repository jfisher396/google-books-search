import React, { Component } from "react";
import axios from "axios";

export default class SavedBook extends Component {
    state = {
        projectors: [],
    };
    componentDidMount() {
        axios
            .get("/api/projectors")
            .then((response) => this.setState({ projectors: response.data }));
    }

    render() {
        const { projectors } = this.state;
        return (
            <>
                <div className="container">
                    <h3>Projectors</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Model</th>
                                <th scope="col">Quantity Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectors.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{item.model}</td>
                                        <td>{item.quantity}</td>
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