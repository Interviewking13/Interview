const mongoose = require('../config/database');
const Product = require('../models/index');
const Cart = require('../models/index');
const Order = require('../models/index');
const User = require('../models/index');

// DB 초기화하는 코드 넣기

Product.deleteMany({});
Cart.deleteMany({});
Order.deleteMany({});
User.deleteMany({});

// DB 저장

Product.create(FakeProduct)
  .then(products => {
    console.log('[LOG] Product Fake Data Generate Done!');
  }) //console.log(products)
  .catch(err => console.log(err));

Cart.create(FakeCart)
  .then(cart => {
    console.log('[LOG] Cart Fake Data Generate Done!');
  }) //console.log(cart)
  .catch(err => console.log(err));

Order.create(FakeOrder)
  .then(order => {
    console.log('[LOG] Order Fake Data Generate Done!');
  }) //console.log(order)
  .catch(err => console.log(err));

User.create(FakeUser)
  .then(user => {
    console.log('[LOG] User Fake Data Generate Done!');
  }) //console.log(user)
  .catch(err => console.log(err));
