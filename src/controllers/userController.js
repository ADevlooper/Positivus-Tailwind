
// Import the User model
// WHAT: We import the 'User' model (schema) from our models folder.
// WHY: This allows us to interact with the 'users' collection in our MongoDB database (e.g., save, find, or delete users) using a structured format.
const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
// WHAT: Define an asynchronous function named 'getUsers' that takes 'req' (request) and 'res' (response) as arguments.
// WHY: 'req' contains information sent by the user (browsers, apps), and 'res' is what we use to send a reply back. We use 'async' to allow database operations to happen in the background without freezing the server.
const getUsers = async (req, res) => {
    // Start a try-catch block
    // WHAT: A safety wrapper for our code.
    // WHY: If anything goes wrong inside the 'try' block (like the database being offline), the code immediately jumps to the 'catch' block instead of crashing the entire server.
    try {
        // Fetch all users from the database
        // WHAT: We ask the User model to '.find()' everything. The '{}' usually means "no filters" (give me everyone).
        // WHY: We use 'await' to pause strictly this function's execution until the database responds with the data. If we didn't wait, 'users' would be empty/undefined when we try to send it.
        const users = await User.find();

        // Send a success response
        // WHAT: Set the HTTP status to 200 (OK) and send the 'users' list as a JSON object.
        // WHY: Status 200 tells the frontend "Success!". JSON is the standard language for sending data between servers and web/mobile apps.
        res.status(200).json(users);

    } catch (error) {
        // Handle errors (Catch block)
        // WHAT: If the DB fetch fails, we come here. 'error' holds the failure details.
        // WHY: We need to tell the user something went wrong.

        // Send an error response
        // WHAT: Set HTTP status to 500 (Server Error) and send a message describing the error.
        // WHY: Status 500 means "It's not you (the user), it's us (the server)." We send the message so developers can debug it.
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
// WHAT: Define another async function 'registerUser' to handle user creation.
// WHY: This logic separates the "create" action from the "get" action, keeping code organized.
const registerUser = async (req, res) => {
    try {
        // Destructure data from the request body
        // WHAT: Extract 'name', 'email', and 'password' from 'req.body'.
        // WHY: 'req.body' holds the data the user typed into a form (e.g., a signup form). Destructuring makes it cleaner to use these variables later.
        const { name, email, password } = req.body;

        // Check if the user already exists
        // WHAT: Search the database for a user who already has this specific email.
        // WHY: We don't want duplicate accounts. If 'userExists' is true, we stop here.
        const userExists = await User.findOne({ email });

        if (userExists) {
            // Return a 400 Bad Request
            // WHAT: Send status 400 (Client Error) and stop the function with 'return'.
            // WHY: 400 means the user made a mistake (the email is taken). We must 'return' to make sure the code below doesn't run and create the user anyway.
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create the new user
        // WHAT: Use '.create()' to save a new document in the database with the provided info.
        // WHY: 'await' ensures the data is fully saved to the hard drive/cloud before we proceed to tell the user it was successful.
        const user = await User.create({
            name,
            email,
            password,
        });

        // Send the created user back
        // WHAT: If successful, send status 201 (Created) and the user data.
        // WHY: Status 201 is specifically for "I created something successfully". Returning the data confirms to the frontend exactly what was saved (including the new unique _id).
        res.status(201).json(user);

    } catch (error) {
        // Handle creation errors
        // WHAT: Start with status 500 (Server Error).
        // WHY: Could be a validation error (missing name) or database connection loss.
        res.status(500).json({ message: error.message });
    }
};

// Export the functions
// WHAT: Bundle 'getUsers' and 'registerUser' into an object and export them.
// WHY: This allows our 'routes' files to import these specific logic pieces and assign them to URL paths (like '/users' or '/register').
module.exports = {
    getUsers,
    registerUser,
};
