// CRUD create, read, update and delete

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    /* Creating */

    // create a collection
    // db.collection('users').insertOne(
    //   {
    //     name: 'First',
    //     age: 20,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert user');
    //     }

    //     // insertOneWriteOpResult
    //     console.log(result.ops);
    //   }
    // );

    // create many collection
    // db.collection('users').insertMany(
    //   [
    //     {
    //       name: 'John',
    //       age: 34,
    //     },
    //     {
    //       name: 'Jane',
    //       age: 25,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert documents');
    //     }

    //     console.log(result.ops);
    //   }
    // );

    /* Reading */

    // db.collection('users').findOne(
    //   { _id: new ObjectID('60d97439541b383ed09ffb7d') },
    //   (error, user) => {
    //     if (error) {
    //       return console.log('Unable to fetch data');
    //     }

    //     console.log(user);
    //   }
    // );

    // db.collection('users')
    //   .find({ age: 20 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    /* Updating */

    // db.collection('users')
    //   .updateMany(
    //     {
    //       age: 20,
    //     },
    //     {
    //       $set: {
    //         age: 21,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection('users')
    //   .updateOne(
    //     {
    //       _id: new ObjectID('60d97439541b383ed09ffb7d'),
    //     },
    //     {
    //       $inc: {
    //         age: 2,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    /* Deleting */

    // db.collection('users')
    //   .deleteOne({
    //     name: 'Mike',
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .then((error) => {
    //     console.log(error);
    //   });

    // db.collection('users')
    //   .deleteMany({
    //     age: 21,
    //   })
    //   .then((result) => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
);
