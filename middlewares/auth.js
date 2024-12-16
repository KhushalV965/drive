const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
      
    }

   

}

module.exports = auth;