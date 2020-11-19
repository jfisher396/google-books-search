import React from 'react'


export default function JumboTron(props) {

    return (
        <div className="jumbotron">
           
            <img className="jumbotron-image" alt={props.heading} src={props.jumboImage}></img>
            <h1 className="jumbotron-heading">{props.heading}</h1>

        </div>
    )
}


