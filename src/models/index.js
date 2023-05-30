const mongoose = require('../config/database');

const ProductSchema = require('./schemas/product');
const CartSchema = require('./schemas/cart');
const OrderSchema = require('./schemas/order');
const UserSchema = require('./schemas/user');

exports.Product = mongoose.model('Product', ProductSchema);
exports.Cart = mongoose.model('Cart', CartSchema);
exports.Order = mongoose.model('Order', OrderSchema);
exports.User = mongoose.model('User', UserSchema);
