//pass for Mongo lLXD7hTlxIiPti3b

// mongodb+srv://andryxins:lLXD7hTlxIiPti3b@cafetrackerdata-dshq5.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const OrdersRoutes = require('./Routes/OrderRoutes');
const DishesRoutes = require('./Routes/DishesRoutes');
// const Order = require('./models/order');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('/orders', OrdersRoutes);
server.use('/dishes', DishesRoutes);

server.get('/', (req, res) => {
  res.send('Hello, Im working');
});

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    const connetctionString = `mongodb+srv://andryxins:lLXD7hTlxIiPti3b@cafetrackerdata-dshq5.mongodb.net/cafe_data`;
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

///////
