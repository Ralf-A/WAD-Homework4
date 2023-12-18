const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "pass", //add your password
    database: "HomeWork4",
    host: "localhost",
    port: "5432"
});

const execute = async(query) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query); // executes a query
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;
const createPostsTableQuery = `
    CREATE TABLE IF NOT EXISTS "posts" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        body varchar(500) NOT NULL,
        date TIMESTAMP NOT NULL
    );
`;    
execute(createPostsTableQuery).then(result => {
    if (result) {
        console.log('Table "posts" is created');
    }
});
execute(createUsersTableQuery).then(result => {
    if (result) {
        console.log('Table "users" is created!');
    }
});

module.exports = pool;