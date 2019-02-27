const {mongoose} = require('./../Server/db/mongoose');
const {Todo} = require('./../Server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../Server/models/user');

// const id = '5c756a6bca2692a49dbb1685';

// if(!ObjectID.isValid(id))
// {
//     console.log('Invalid id');
// }

// Todo.find({
//     _id: id
// }).then((todos) => 
// {
//     console.log(`todos: ${todos}`);
// }).catch((e) => console.log(e));

// Todo.findOne({
//     _id: id
// }).then((todo) => 
// {
//     console.log(`todo: ${todo}`);
// }).catch((e) => console.log(e));

// Todo.findById(id).then((todo) =>
// {
//     if(!todo)
//     return console.log('Id not found!');
//     console.log(`todo: ${todo}`);
// }).catch((e) => console.log(e));

const id = '5c73cf40f597b4697c1defd2';

User.findById(id).then((user) => 
{
    if(!user) return console.log(user);
    console.log(`User: ${user}`);
}).catch((err) => console.log('Invalid ID')); 
