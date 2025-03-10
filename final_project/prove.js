/*ESEMPIO: // Push a new user object into the users array based on query parameters from the request
    users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
    });
    // Send a success message as the response, indicating the user has been added
    res.send("The user " + req.query.firstName + " has been added!");
});

//CODICE PROGETTO:
regd_users.post("/auth/review/:isbn",(req, res) => {
    
//push a new review into the books obj array with a req query
    review.push({
            "reviews": req.query.reviews
    })
//send a success response, indicating the reviews has been added
    res.send("The review has been added");
});*/


//extract isbn params and find books with matching isbn

/* ESEMPIO: Extract email params and find users with matching email

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

//ESEMPIO 2 POST method
router.post("/", function(req, res) {
    // Check if email is provided in the request body
    if (req.body.email) {
        // Create or update friend's details based on provided email
        friends[req.body.email] = {
            "firstName": req.body.firstName,
            // Add similarly for lastName
            // Add similarly for DOB
        };
    }
    // Send response indicating user addition
    res.send("The user" + (' ') + (req.body.firstName) + " Has been added!");
});

//ESEMPIO 2 PUT method
router.put("/:email", function(req, res) {
    // Extract email parameter from request URL
    const email = req.params.email;
    let friend = friends[email];  // Retrieve friend object associated with email
    if (friend) {  // Check if friend exists
        let DOB = req.body.DOB;
        // Add similarly for firstName
        // Add similarly for lastName
        // Update DOB if provided in request body
        if (DOB) {
            friend["DOB"] = DOB;
        }
        // Add similarly for firstName
        // Add similarly for lastName
        friends[email] = friend;  // Update friend details in 'friends' object
        res.send(`Friend with the email ${email} updated.`);
    } else {
        // Respond if friend with specified email is not found
        res.send("Unable to find friend!");
    }
});




 
//CODICE PROGETTO1:
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

