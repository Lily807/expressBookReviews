const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check if the username is valid
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
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    }

    return res.status(404).send("Username and password not found");
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.user.data;

    let book = Object.values(books).find(book => book.isbn === isbn);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!book.reviews) {
        book.reviews = {};
    }

    book.reviews[username] = review;

    return res.status(200).json({ message: "Review added/updated", reviews: book.reviews });
});


/*let filteredBooks = Object.entries(books).find(([key, value]) => {
    return value.isbn === isbn
});

if (!filteredBooks) {
    return res.status(404).json({ message: "Book not found" });
}

if (!filteredBooks.reviews) {
    filteredBooks.reviews = {};
}

filteredBooks.reviews[username] = review;

return res.status(200).json({ message: "Review added/updated", reviews: filteredBooks.reviews });*/


regd_users.delete("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    const username = req.user.data;

    let book = Object.values(books).find(book => book.isbn === isbn);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!book.reviews || !book.reviews[username]) {
        return res.status(400).json({ message: "Review not found for this user" });
    }

    delete book.reviews[username];

    return res.status(200).json({ message: "Review deleted successfully", reviews: book.reviews });

});

/*let filteredBooks = Object.entries(books).find(([key, value]) => {
    return value.isbn === isbn
});

if (!filteredBooks) {
    return res.status(404).json({ message: "Book not found" });
}

const book = filteredBooks;

// Verifica che la recensione esista per questo utente
if (!book.reviews || !book.reviews[username]) {
    return res.status(400).json({ message: "Review not found for this user" });
}

// Elimina la recensione dell'utente
delete book.reviews[username];
return res.status(200).json({ message: "Review deleted successfully", reviews: book.reviews });*/




module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

