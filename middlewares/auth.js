const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorize'
        })
    }

    try {
       
    }
   

}

module.exports = auth;