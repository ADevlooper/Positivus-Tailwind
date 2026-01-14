
// Import the 'mongoose' library
// WHAT: Mongoose is a tool that allows our Node.js application to talk to a MongoDB database.
// WHY: It provides an easy way to model our data and interact with the database using JavaScript instead of raw database commands.
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the database
// WHAT: This function, named 'connectDB', handles the process of establishing a connection to the database.
// WHY: We use 'async' because connecting to a database takes time (it's an asynchronous operation), and we want our code to wait for it to finish without freezing the rest of the application.
const connectDB = async () => {

    // Start a 'try-catch' block to handle potential errors
    // WHAT: This structure allows us to attempt an action (the 'try' block) and safely handle any problems if they occur (the 'catch' block).
    // WHY: Database connections can fail for many reasons (bad internet, wrong password, server down). This prevents our app from crashing immediately if something goes wrong.
    try {

        // Attempt to connect to MongoDB using the connection string
        // WHAT: We call 'mongoose.connect' with our database URL (stored in process.env.MONGO_URI).
        // WHY: 'await' pauses this function here until the connection is successfully established. 'process.env.MONGO_URI' keeps our secret database password safe in an environment variable file instead of hardcoding it here.
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Log a success message to the console
        // WHAT: Prints a message confirming that the database is connected, along with the host name.
        // WHY: This gives the developer immediate visual feedback in the terminal that the backend is up and running correctly.
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {

        // Handle any errors that occurred during the connection attempt
        // WHAT: If the 'try' block fails, code execution jumps here. passing the 'error' object gives us details about what went wrong.
        // WHY: We need to know WHY it failed so we can fix it.

        // Log the error message
        // WHAT: Prints the specific error details to the console.
        // WHY: Helps with debugging by showing the exact reason for the failure (e.g., "Authentication failed").
        console.log(`Error: ${error.message}`);

        // Exit the process with failure
        // WHAT: 'process.exit(1)' stops the entire Node.js application immediately. The '1' signifies an error code (0 usually means success).
        // WHY: If the database is essential for the app (which it usually is), there's no point in keeping the server running without it. It's better to fail fast and restart.
        process.exit(1);
    }
};

// Export the connectDB function
// WHAT: This makes the 'connectDB' function available to be used in other files (like our main 'server.js' or 'index.js').
// WHY: We want to keep our code modular. We define the database logic here but run it from the main entry point of our application.
module.exports = connectDB;
