require('dotenv').config();
module.exports = {
    TOKEN_SECRET : process.env.TOKEN_SECRET,
    DB_URL : process.env.DB_URL,
    PORT : process.env.PORT
}