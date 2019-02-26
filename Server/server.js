var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

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

//Seeting up GET route:

app.get('/todos', (req,res) => 
{
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err)
  })
});


app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

module.exports = {app}

