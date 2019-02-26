var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var {ObjectID} = require('mongodb');

const express = require('express');
const bodyParser = require('body-parser');

//Creating express app:
var app = express();

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
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

module.exports = {app}

