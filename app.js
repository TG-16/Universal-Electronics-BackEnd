
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './utils/.env'});
const checkAuth = require('./utils/checkAuth');
const cookieParser = require('cookie-parser');




app.use(cors({
    origin: 'http://localhost:3000',  // don't use '*'
    credentials: true                 // allow sending cookies
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);
app.get("/check-auth" , checkAuth.checkAuth);
app.get("/check-login" , checkAuth.checkLogin);
app.get("/find-userId" , checkAuth.findUserId);

const port = process.env.PORT ;
const dbURI = process.env.MONGO_URI ;

mongoose.connect(dbURI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log('Server is running on port ' + port);
    });
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

