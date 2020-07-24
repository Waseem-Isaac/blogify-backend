let config = {};
config.baseUrl = 'https://blogify-backend.herokuapp.com/';
// config.baseUrl = 'http://localhost:3000/';
config.db = {};
config.db.username = 'waseem';
config.db.password = 'webdeveloper';
config.db.connectionString = `mongodb+srv://${config.db.username}:${config.db.password}@cluster0-rfqh1.azure.mongodb.net/test?retryWrites=true&w=majority`;

config.jwtPrivateKey = "myprivatekey";

module.exports = config;