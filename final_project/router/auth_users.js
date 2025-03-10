const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    // Check if the user with the given username and password exists
    // Filter the users array for any user with the same username and password

    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}


//only registered users can login
regd_users.post("/login", (req, res) => {

    // Login endpoint
    const username = req.query.username;
    const password = req.query.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Body Empty" });
    }

    if (authenticatedUser(username, password)) {

        // Generate JWT access token
        let accessToken = jwt.sign({
            data: username
        }, 'access', { expiresIn: 60 * 60 });

        // Store access token in session
        req.session.authorization = {
            accessToken
        }
        return res.status(200).send("User successfully logged in");
    }

    return res.status(404).send("Username and password not found");
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    const review = req.query.review;
    let chiave;

    let filteredBooks = Object.entries(books).filter(([key, value]) => {
        return value.isbn === isbn });

    if (filteredBooks.length > 0) {
        //filteredBooks[0].reviews[isbn] = review;
        console.log(filteredBooks[chiave]);
        console.log(chiave);
        res.send(filteredBooks[chiave]);
    } else {
        return res.status(404).json({ message: "ISBN not found" });
    }

    

});







/* regd_users.delete("/auth/review/:isbn", (req, res) => { });

 ESEMPIO:
// Extract the email parameter from the request URL
    const email = req.params.email;
    // Filter the users array to exclude the user with the specified email
    users = users.filter((user) => user.email != email);
    // Send a success message as the response, indicating the user has been deleted
    res.send(`User with the email ${email} deleted.`);
    

    //CODICE PROGETTO:
    // extract the review params
    const review = req.params.reviews;
    // const isbn = req.params.isbn;
     //filter the reviews to delete the review with specified isbn
     reviews = reviews.filter((review) => review.isbn != isbn);
     res.send(`the review has been deleted`);*/



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

