const { MongoClient, ObjectID } = require('mongodb');

// const obj = new ObjectID();
// console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => 
{
    if(err)
    {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //Update the document with specific ID:
    // db
    // .collection('todos')
    // .findOneAndUpdate(
    //  {
    //      _id: new ObjectID('5c72b3426bbd9660f49bf30a')
    //  },
    //  {
    //     $set: { 
    //         completed: true
    //     }
    //  },
    //  {
    //      returnOriginal: false
    //  })
    //  .then(
    //      (res) => console.log(JSON.stringify(res, undefined, 2)),
    //      (err) => console.log(err)
    //  );
    
    //Update the name and age fields in the specific document
    db
    .collection('todos')
    .findOneAndUpdate(
      {
        _id: new ObjectID('5c72b3426bbd9660f49bf30a')
      },
      {
          $set: 
          {
             name: 'Learning HTML, CSS' 
          },
          $inc: 
          {
              hours: -2
          }
       },
          {
            returnOriginal: false
          }
          
      )
      .then(
        (res) => console.log(res),
        (err) => console.log(err)
      );
});