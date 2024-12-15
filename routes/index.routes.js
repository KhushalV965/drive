const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const fileModel = require("../models/file.model");
const authMiddleware = require('../middlewares/auth');

router.get('/home', (req, res) => {
    res.render('home');
});




router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {

    const newFile = await fileModel.create({
        path: req.file.path,
        originalname: req.file.originalname,
        user: req.user.userId
    })

    res.json(newFile)
})



module.exports = router;