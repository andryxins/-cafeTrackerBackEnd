require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const mongoUri = process.env.MONGO_URI
const OrdersRoutes = require('./Routes/OrderRoutes');
const DishesRoutes = require('./Routes/DishesRoutes');
const AuthRoutes = require('./Routes/AuthRoutes');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(passport.initialize());
require('./middleware/passport')(passport);

server.use('/orders', OrdersRoutes);
server.use('/dishes', DishesRoutes);
server.use('/auth', AuthRoutes);

server.get('/', (req, res) => {
  res.send('Hello, Im working');
});

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    const connetctionString = mongoUri;
    await mongoose.connect(connetctionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    server.listen(PORT, () => {
      console.log(`Server started at ${PORT}...`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
