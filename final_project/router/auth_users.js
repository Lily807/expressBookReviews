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

/*ESEMPIO: // Push a new user object into the users array based on query parameters from the request
    users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
    });
    // Send a success message as the response, indicating the user has been added
    res.send("The user " + req.query.firstName + " has been added!");
});*/

//CODICE PROGETTO:
regd_users.post("/auth/review/:isbn",(req, res) => {
    
//push a new review into the books obj array with a req query
    reviews.push({
            "reviews": req.query.reviews
    })
//send a success response, indicating the reviews has been added
    res.send("The review has been added");
});

regd_users.put("/auth/review/:isbn", (req, res) => {

    /* ESEMPIO: Extract email parameter and find users with matching email

    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    
    if (filtered_users.length > 0) {
        // Select the first matching user and update attributes if provided
        let filtered_user = filtered_users[0];
        
         // Extract and update DOB if provided
        
        let DOB = req.query.DOB;    
        if (DOB) {
            filtered_user.DOB = DOB;
        }
        
        // Replace old user entry with updated user
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        
        // Send success message indicating the user has been updated
        res.send(`User with the email ${email} updated.`);
    } else {
        // Send error message if no user found
        res.send("Unable to find user!");
    } 
    
CODICE PROGETTO:
    // extract isbn params and find review with matching isbn

    const isbn = req.params.isbn;
    let filtered_reviews = reviews.filter((review) => review.isbn === isbn);
    
    if (filtered_reviews.length > 0) {
        // Select the first matching review and update attributes if provided
        let filtered_reviews = filtered_reviews[0];
        
         // Extract and update review if provided
        
        let review = req.query.reviews;    
        if (review) {
            filtered_reviews.review = review;
        }
    
    // Replace old review entry with updated review
        reviews = reviews.filter((review) => review.isbn != isbn);
        reviews.push(filtered_review);
        
        // Send success message indicating the review has been updated
        res.send(`the review has been updated.`);
    } else {
        // Send error message if no review found
        res.send("Unable to find review!");
    } 
    */


});


regd_users.delete("/auth/review/:isbn", (req, res) => { });

/* ESEMPIO:
// Extract the email parameter from the request URL
    const email = req.params.email;
    // Filter the users array to exclude the user with the specified email
    users = users.filter((user) => user.email != email);
    // Send a success message as the response, indicating the user has been deleted
    res.send(`User with the email ${email} deleted.`);

    CODICE PROGETTO:
    // extract the review params
    const review = req.params.reviews;
    oppure const isbn = req.params.isbn;
     filter the reviews to delete the review with specified isbn
     reviews = reviews.filter((review) => review.isbn != isbn);
     res.send(`the review under the isbn ${isbn} has been deleted`);

*/

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

