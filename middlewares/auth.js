const jwt = require('jsonwebtoken');


function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorize'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
    }
   

}

module.exports = auth;