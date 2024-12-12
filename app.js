const express = require('express');
const app = express();
const userRoute = require('./routes/user.routes');
const indexRoute = require('./routes/index.routes');
const dotenv = require('dotenv');
const connectToDB = require('./config/db');
const cookieParser = require('cookie-parser');
connectToDB();

dotenv.config();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
 

app.get('/', (req, res) => {
    res.render('index');
}); 

app.use('/user', userRoute);
app.use('/', indexRoute);


app.listen(3000, () => {
    console.log(`Server is running at port 3000`);
});

