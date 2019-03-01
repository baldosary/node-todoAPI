const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
 id: 100
};
const token = jwt.sign(data, 'secret');
console.log(token);
const decoded = jwt.verify(token, 'secret');
console.log(decoded);