//const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

const obj = new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => 
{
    if(err)
    {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //Add new collection:
    // db.collection('todos').insertOne({
    //    name: 'Learning Node.js',
    //    completed: false
    //   }, (err, result) => 
    //   {
    //     if(err)
    //     {
    //       return console.log('Unable to insert to do',err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));  
    //   });
    
    //Adding User collection:
    db.collection('user').insertOne(
    {
      name: 'Bushra Aldosary',
      age: 27,
      location: 'KSA/Abha'
    }, (err, result) =>
    {
       if(err)
       return console.log('Unable to insert the document', err);
       console.log(JSON.stringify(result.ops[0], undefined, 2));
    });


    db.close();
    
});