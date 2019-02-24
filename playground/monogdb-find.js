const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => 
{
     if(err)
     return console.log('Unable to connect to MongoDB Server.');
     console.log('Connected to MongoDB Server');

    //  db.collection('todos').find( { _id : new ObjectID('5c7288d66bbd9660f49beebc')}).toArray().then((docs) => 
    //  {
    //      console.log(JSON.stringify(docs, undefined, 2));
    //  }, (err) => 
    //  {
    //      console.log('Unable to fetch the documents', err);
    //  });

    // db.collection('todos').find( ).count().then((count) => 
    //  {
    //      console.log(count);
    //  }, (err) => 
    //  {
    //      console.log('Unable to fetch the documents', err);
    //  });

    db
    .collection('user')
    .find({name: 'Bushra Aldosary'})
    .toArray().then((docs) => 
    {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => 
    {
        console.log('Unable to fetch the docs', err);
    });
     

     //db.close();

})