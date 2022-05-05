import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Member from "./Member";
import "./MembersPage.css";

const MembersPage = () => {
    const [users, updateUsers] = useState([]);

    useEffect ( () => {
        axios.get("mongodb://127.0.0.1:27017/users")
        .then(res => updateUsers(res));
    }, []);
    return (
        <div class = "page">
            <h1>Photographers: </h1>
            {users.length !== 0 ? users.map(user => {
                return (
                    <Member email = {user.email} profilePicture = {user.profilePicture} city = {user.city} description = {user.description} pictures = {user.pictures} contactInfo = {user.contactInfo} />
                )
            }) : []}
        </div>
    )
};

export default MembersPage;