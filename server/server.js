const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
// We need to include "credentials: true" to allow cookies to be represented  
// Also "credentials: 'include'" need to be added in Fetch API in the Vue.js App

app.use(express.json()); // Parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

const secret = "gdgdhdbcb770785rgdzqws"; // use a stronger secret
const maxAge = 60 * 60; //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
        //jwt.sign(payload, secret, [options, callback]), and it returns the JWT as string
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


// is used to check whether a user is authinticated
app.get('/auth/authenticate', async(req, res) => {
    console.log('Authentication request has been arrived');
    const token = req.cookies.jwt; // assign the token named jwt to the token const
    //console.log("token " + token);
    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) { //checks if the token exists
            //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
            await jwt.verify(token, secret, (err) => { //token exists, now we try to verify it
                if (err) { // not verified, redirect to login page
                    console.log(err.message);
                    console.log('Token is not verified');
                    res.send({ "Authenticated": authenticated }); // authenticated = false
                } else { // token exists and it is verified 
                    console.log('User is authenticated');
                    authenticated = true;
                    res.send({ "Authenticated": authenticated }); // authenticated = true
                }
            })
        } else { //applies when the token does not exist
            console.log('User is not authenticated');
            res.send({ "Authenticated": authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// signup a user
app.post('/auth/signup', async(req, res) => {
    try {
        console.log("A signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt) // hash the password and the salt 
        const authUser = await pool.query( // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*", [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)
        //console.log(token);
        //res.cookie("isAuthorized", true, { maxAge: 1000 * 60, httpOnly: true });
        //res.cookie('jwt', token, { maxAge: 6000000, httpOnly: true });
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', async(req, res) => {
    try {
        console.log("A login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        /* 
        To authenticate users, you will need to compare the password they provide with the one in the database. 
        bcrypt.compare() accepts the plain text password and the hash that you stored, along with a callback function. 
        That callback supplies an object containing any errors that occurred, and the overall result from the comparison. 
        If the password matches the hash, the result is true.

        bcrypt.compare method takes the first argument as a plain text and the second argument as a hash password. 
        If both are equal then it returns true else returns false.
        */

        //Checking if the password is correct
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//logout a user = deletes the jwt
app.get('/auth/logout', (req, res) => {
    console.log('Logout request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
});

app.post('/api/createPost', async (req, res) => {
    console.log('Create post request arrived');
    try {
        // Extract data from the request body
        const { body, date } = req.body;

        // TODO: Perform any necessary validation on the input data

        // Example: Insert the post into the database
        const newPost = await pool.query(
            "INSERT INTO posts(body, date) VALUES ($1, $2) RETURNING *",
            [body, date]
        );

        // TODO: You may want to do additional processing or error checking

        res.status(201).json(newPost.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/updatePost/:postId', async (req, res) => {
    console.log('Update post request arrived');
    try {
        const { body, date } = req.body;
        const postId = req.params.postId;

        // TODO: Perform any necessary validation on the input data

        // Example: Update the post in the database
        const updatedPost = await pool.query(
            "UPDATE posts SET body = $1, date = $2 WHERE id = $3 RETURNING *",
            [body, date, postId]
        );

        // TODO: You may want to do additional processing or error checking

        res.status(200).json(updatedPost.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/deletePost/:postId', async (req, res) => {
    console.log('Delete post request arrived');
    try {
        const postId = req.params.postId;

        // Example: Delete the post from the database
        const deletedPost = await pool.query(
            "DELETE FROM posts WHERE id = $1 RETURNING *",
            [postId]
        );

        // TODO: You may want to do additional processing or error checking

        res.status(200).json(deletedPost.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

app.delete('/api/deleteAllPosts', async (req, res) => {
    console.log('Delete all posts request arrived');
    try {
        // Example: Delete all posts from the database
        const deletedPosts = await pool.query("DELETE FROM posts RETURNING *");

        // TODO: You may want to do additional processing or error checking

        res.status(200).json(deletedPosts.rows);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/receivePosts', async (req, res) => {
    console.log('Receive all posts request arrived');
    try {
        console.log("Before query execution");
        const posts = await pool.query("SELECT * FROM posts");
        console.log("After query execution");
    
        // Log the SQL query
        console.log("SQL Query:", "SELECT * FROM posts");
    
        res.status(200).json(posts.rows);
    } catch (error) {
        console.error("Error in try-catch block:", error.message);
        res.status(400).json({ error: error.message });
    }    
});
// Fetch a single post by ID
app.get('/api/receivePost/:postId', async (req, res) => {
    console.log('Receive post request arrived');
    try {
        const postId = req.params.postId;

        // Example: Retrieve the post from the database by ID
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [postId]);

        // Check if the post with the given ID exists
        if (post.rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post.rows[0]);
    } catch (error) {
        console.error("Error in try-catch block:", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

