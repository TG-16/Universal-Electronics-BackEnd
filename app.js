
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);

mongoose.connect('mongodb://localhost:27017/UniversalElectronics'
)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

