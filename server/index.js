const express = require('express')
const app = express();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('dbcrud', 'root', '010200', {
    host: 'localhost',
    dialect: 'mysql'
});
const port = 3001;

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


app.get('/', (req, res) => {
    res.send('Hello World');
})


app.listen(port, () => console.log("Server Started in: 127.0.0.1:" + port))