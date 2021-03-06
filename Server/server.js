require('./config/config');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var {ObjectID} = require('mongodb');
var _=require('lodash');
var {authenticate} = require('./../middlewares/authentciation');

const express = require('express');
const bodyParser = require('body-parser');

/////Routing for Todo model(collection)/////

//Creating express app:
var app = express();

var port = process.env.PORT || 3000;
//Setting-up the post routing: 
app.use(bodyParser.json());
app.post('/todos', (req,res) => 
{

  var todo = new Todo(
  {
      text: req.body.text
  });

  todo.save().then((doc) => 
  {
    res.send(doc);
  }, (e) =>
  {
    res.status(400).send(e);
  });
});

//Setting up a first GET route:

app.get('/todos', (req,res) => 
{
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err)
  })
});

//Setting up the second GET route to get specific todo by id:

app.get('/todos/:id', (req,res) => 
{
   var id = req.params.id;
  //Check if the passing id is valid:
  if(!ObjectID.isValid(id))
  {
     return res.status(404).send() ;
  }
     Todo.findById(id).then((todos) => 
     {
       if(!todos) 
       {
        return res.status(404).send();
       }  
       res.send({todos});
     }).catch((e) => res.status(400));

});
//Setting up the delete route:
app.delete('/todos/:id', (req,res) => 
{
    //Get Id:
    var id = req.params.id;
    //validate the id
    if(!ObjectID.isValid(id))
    {
      //not valid: return 404
       return res.status(404).send();
    }
    //Remove todo byId 
     //success
      //if no docs: return 404
      //if docs send the doc back with 200
    //error 
     //send back 400 with empty body
     Todo.findByIdAndRemove(id).then((todo) => 
     {
       if(!todo) return res.status(404).send();
       res.send({todo});
     }).catch((e) => res.status(400).send());
    
});
//Setting up PATCH route for updating todo
app.patch('/todos/:id', (req,res) => 
{
  const id = req.params.id;
  const body = _.pick(req.body, ['text','completed']);

  if(!ObjectID.isValid(id))
  return res.status(404).send();

  if(_.isBoolean(body.completed) && body.completed)
  {
    body.completedAt = new Date().getTime();
  }
  else
  {
    body.completed = false;
    body.completedAt = null;  
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) =>
  {
    if(!todo) return res.status(404).send();
    res.send({todo});
  }).catch((e) => res.status(404));
})

////Routing for User model(collection)////
app.post('/users', (req,res) =>
{
  const body = _.pick(req.body, ['email','password']);
  const user = new User(body);
  user.save().then((user) =>
  {
    return user.generateAuthToken();
  }).then((token) => res.header('x-auth',token).send(user)).catch((e) => res.status(400).send(e));
});

app.get('/user/me', authenticate, (req,res) =>
{
      res.send(req.user);
});
app.listen(port, () => {
  console.log(`The server is up on port ${port}`);
});
app.get('/users/me', (req,res) => 
{
   
});

module.exports = {app}

