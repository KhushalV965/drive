const express = require('express');
const app = express();
const userRoute = require('./routes/user.routes')


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

app.use('/user', userRoute);

app.listen(3000, () => {
    console.log(`Server is running at port 3000`);
});