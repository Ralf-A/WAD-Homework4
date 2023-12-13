const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "sql", //add your password
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


const createExistingPostsQuery = `INSERT INTO posts (body, date)
VALUES
    ('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', NOW()),
    ('Integer euismod mauris ut sapien pulvinar, eget tristique augue laoreet. Vestibulum bibendum felis id dui aliquam, nec cursus purus ultrices.', NOW()),
    ('Vivamus at bibendum libero. Suspendisse ac eros at nisi pellentesque scelerisque.', NOW()),
    ('Proin euismod dolor ut libero posuere tristique. Nulla facilisi. Sed euismod elit eu massa pellentesque, vitae aliquam elit feugiat.', NOW()),
    ('Ut vel elit eu tellus malesuada tincidunt ac a tortor. Ut auctor ligula ac purus cursus, at fringilla quam efficitur.', NOW()),
    ('Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', NOW()),
    ('Suspendisse potenti. Fusce et ex ut sem accumsan accumsan.', NOW()),
    ('In hac habitasse platea dictumst. Aenean feugiat, velit eu congue fringilla, justo tortor blandit mi, ac scelerisque ligula nisl id risus.', NOW()),
    ('Quisque et fermentum sapien. Duis non est vel orci interdum tempus.', NOW()),
    ('Curabitur vel leo vel ligula vehicula auctor vitae in justo. Maecenas in ligula et purus euismod fringilla ut vel est.', NOW());
    `;

const createDefaultUsersQuery = `INSERT INTO users (email, password)
VALUES
    ('ralf@ut.ee', '123'),
    ('karl@ut.ee', '123'),
    ('oliver@ut.ee', '123');
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
execute(createExistingPostsQuery).then(result => {
    if (result) {
        console.log('Existing posts created!');
    }
});
execute(createDefaultUsersQuery).then(result => {
    if (result) {
        console.log('Default users created!');
    }
});

module.exports = pool;