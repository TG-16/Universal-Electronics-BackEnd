const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './utils/.env'});


const checkAuth = (req, res) => {
    const token = req.cookies.JWT; // || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        return res.status(200).json({message: "Authorized"});
    });
}

const checkLogin = (req, res) => {
    const token = req.cookies.JWT; // || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        return res.status(200).json({message: "Authorized"});
    });
}

const findUserId = (req, res) => {
    const token = req.cookies.JWT;
    if (!token) {
        return res.status(401).json({ error: 'Log in to check out' });
    }
    else
    {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            console.log(decoded.id);
            return res.status(200).json({ userId: decoded.id });
        });
    }
}

module.exports = {
    checkAuth,
    checkLogin,
    findUserId
}