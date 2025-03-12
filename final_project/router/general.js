const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios").default;


public_users.post("/register", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});







/* Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.send(JSON.stringify({ books }, null, 4));
});*/

//Get the book list available in the shop - update with Promise
public_users.get('/', function (req, res) {
    new Promise((resolve, reject) => {
        if(books){
            resolve(books);
        } else {
            reject({message: "no books found"});
        }
    })
    .then((data) => res.status(200).json(data))
    .catch((err)=> res.status(404).json(err));
});


/* Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    let filteredBooks = Object.entries(books).filter(([key, value]) => {return value.isbn === isbn});

    if (filteredBooks.length > 0) {
        res.send(filteredBooks);
    } else {
        return res.status(404).json({ message: "ISBN not found" });
    }
});*/

//Get book details based on ISBN - update with Promise
public_users.get('/isbn/:isbn', function (req, res)  {
    const isbn = req.params.isbn;

    new Promise((resolve, reject) => {
        let filteredBooks = Object.entries(books).filter(([key, value]) => {return value.isbn === isbn});
        
        if (filteredBooks.length > 0) {
            resolve(filteredBooks);
        } else {
            reject({message: "ISBN not found"});
        }
    })
    .then((data) => res.status(200).json(data))
    .catch((err)=> res.status(404).json(err));
});


/* Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let filteredBooks = Object.entries(books).filter(([key, value]) => {return value.author === author});

    if (filteredBooks.length > 0) {
        res.send(filteredBooks);
    } else {
        return res.status(404).json({ message: "Author not found" });
    }
    
});*/

// Get book details based on author - update with Promise
 public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    

    new Promise((resolve, reject) =>{
        let filteredBooks = Object.entries(books).filter(([key, value]) => {return value.author === author});
        if (filteredBooks.length > 0) {
            resolve(filteredBooks);
        } else {
            reject({message: "Author not found"});
        }
    })
    .then((data) => res.status(200).json(data))
    .catch((err)=> res.status(404).json(err));
});

/* Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let filteredBooks = Object.entries(books).filter(([key, value]) => {return value.title === title});

    if (filteredBooks.length > 0) {
        res.send(filteredBooks);
    } else {
        return res.status(404).json({ message: "Title not found" });
    }
});*/

// Get all books based on title - update with Promise
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    new Promise ((resolve, reject) =>{
        let filteredBooks = Object.entries(books).filter(([key, value]) => {return value.title === title});
        if (filteredBooks.length > 0) {
            resolve(filteredBooks);
        } else {
            reject({message: "Title not found"});
        }

    })
    .then((data) => res.status(200).json(data))
    .catch((err)=> res.status(404).json(err));
});


//  Get book review - task 5
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    let filteredBooks = Object.entries(books).filter(([key, value]) => {return value.isbn === isbn});

    if (filteredBooks.length > 0) {
        res.send(filteredBooks.map(([id, book]) => book.reviews));
    } else {
        return res.status(404).json({ message: "Review not found" });
    }
});

module.exports.general = public_users;