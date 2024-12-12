const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Render register page
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle user registration
router.post(
    '/register',
    [
        body('username')
            .trim()
            .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('email')
            .trim()
            .isEmail()
            .isLength({ min: 13 }).withMessage('Email must be at least 13 characters long'),
        body('password')
            .trim()
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid Data',
            });
        }

        const { username, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            username,
            email,
            password: hashPassword,
        });

        res.status(201).json({ newUser });
    }
);

// Render login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle user login
router.post('/login',
    body('email').trim().isEmail().isLength({ min: 13 }).withMessage('Invalid email'),
    body('password').trim().isLength({ min: 6 }).withMessage('Invalid password'),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: 'Invalid data',
            });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid email or password',
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                username: user.username,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token);
        res.send('Logged in');
    }
);

module.exports = router;
