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

        // //deleteMany
        // db.collection('todos').deleteMany({name: 'Practicing IELTS'}).then((result) =>
        // {
        //     console.log(result);
        // }, (err) => console.log('Unable to delete the docs', err));
        // //deleteOne
        // db.collection('todos').deleteOne({name: 'Learning Node.js'}).then((result) => 
        // {
        //     console.log(result);
        // }, (err) => 
        // {
        //     console.log('Unable to delete the docs',err);
        // });
    //findOneAndDelete
    //     db.collection('todos')
    //     .findOneAndDelete({name: 'Learning Node.js'})
    //     .then((result) => 
    //     {
    //         console.log(result);
    //     }, (err) => 
    //     {
    //         console.log('Unable to find the doc', err);
    //     });
    // });

    //Chanllenge
    //Delete all docs with name: Bushra Aldosary

    // db
    // .collection('user')
    // .deleteMany({name: 'Bushra Aldosary'})
    // .then(
    //  (res) => console.log(res), 
    //  (err) => console.log(err));
    

    //Find and Delete docs with specific ID: 
    db
    .collection('user')
    .findOneAndDelete({ _id: new ObjectID('5c72848aa7e7966a2f815129')})
    .then(
     (res) => console.log(JSON.stringify(res,undefined,2)),
     (err) => console.log(err));

     });
    
