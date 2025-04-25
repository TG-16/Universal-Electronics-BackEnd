const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './utils/.env'});
const multer = require("multer");
const path = require("path");
const userModel = require('../models/userModel');


const checkAuth = (req, res) => {
    const token = req.cookies.JWT; // || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const admin = await userModel.findById(decoded.id);
        if (!admin) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (admin.name === 'admin') {
            return res.status(200).json({message: "Authorized"});
        }
        return res.status(401).json({ error: 'Unauthorized' });
    });
}

const checkLogin =  (req, res) => {
    const token = req.cookies.JWT; // || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET,  (err, decoded) => {
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

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store uploaded images (make sure it exists)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });


module.exports = {
    checkAuth,
    checkLogin,
    findUserId,
    upload
}