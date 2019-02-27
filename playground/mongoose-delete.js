const {mongoose} = require('./../Server/db/mongoose');
const {Todo} = require('./../Server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../Server/models/user');


//Remove all docs
// Todo.remove({}).then((result) =>
// {
//     console.log(result);
// });

//FindOneAndRemove --> find one docs and remove it

// Todo.findOneAndRemove('5c76841f914c5933dedc48de').then((docs) =>
// {
//     console.log(docs);
// });

//Find doc by Id and remove it:

Todo.findByIdAndRemove({_id: '5c7684e1914c5933dedc491c'}).then((doc) =>
{
    console.log(doc);
});