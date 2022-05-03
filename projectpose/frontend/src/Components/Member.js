import React, { useState, useEffect } from 'react';
import "./Member.css";

const Member = (props) => {
    const [data, setData] = useState({});
    useEffect ( () => {
        setData(props);
    }, []);

    return (
        <div class = "MemberProfile">
            <h1>Email: {props.email}</h1>
            <img class = "ProfilePicture" src = {props.profilePicture}></img>
            <div class = "details">City: {props.city}</div>
            <div class = "details">{props.description}</div>
            <div class = "portfolio">
                Previous Work: 
                {props.pictures ? props.pictures.map(path => {
                    return (
                        <img class = "photo" src = {path}></img>
                    )
                }) : []}
            </div>
            <div class = "details">Contact Me: {props.contactInfo}</div>
        </div>
    )
};

export default Member;