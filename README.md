# Task Manager Application

## Technologies
mongoDB, mongoose, postman, Robo 3T

## How can you get started
1. download mongoDB
2. download Robo 3T
3. use `/Users/USERNAME/mongodb/bin/mongod.exe –-dbpath=/Users/USERNAME/mongodb-data` command to run mongodb server locally
4. open new terminal
5. create package.json `npm init -y`
6. install mongodb driver by `npm i mongodb`
7. create initial file for making a connection to database, In this case, I create mongodb.js file.
8. use `node mongodb.js` to make a connection 
```javascript
// mongodb.js
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);
  }
);
```
When you want to develop the project in the next time, you can just open Robo 3T and connect to localhost. Then, you can run node.js to develop your project (no need to run --dbpath again).

## Creating data
Add new collection into MongoDB by using insert commands which have 2 kinds of insertion
1. insert only one document
```javascript
db.collection('users').insertOne({
    name: 'First',
    age: 20,
});
```
2. insert many document
```javascript
db.collection('users').insertMany([
  {
    name: 'John',
    age: 34,
  },
  {
    name: 'Jane',
    age: 25,
  },
]);
```

## ObjectID
MongoDB use Global Unique Identifier to be an id for every field/data to handle id conflicts and no need to create id for your own. ObjectID is a 12-byte value consists of 4-byte timestamp, 5-byte random value and 3-byte counter. However, you can also create your own id for the data.

You can use getTimestamp() to get the created time from objectID.

## Reading data
You can read data by using find method. If some data have the same properties like it has the same name and age, MongoDB will return just the first one if you use findOne(). You can specify one you want by searching by ObjectID.

1. find() - query all data that match with your condition and it has a cursor that you can use toArray() to get the array of documents and use count to get amount of the documents.
```javascript
db.collection('users')
  .find({ age: 20 })
  .toArray((error, users) => {
    console.log(users);
  });

// get amount of the documents
db.collection('users')
  .find({ age: 20 })
  .toArray((error, count) => {
    console.log(count);
  });
```

2. findOne() - query individual data
```javascript
// search by property
db.collection('users').findOne({ name: 'John' }, (error, user) => {
  if (error) {
    return console.log('Unable to fetch data');
  }

  console.log(user);
});

// search by ObjectID
db.collection('users').findOne(
  { _id: new ObjectID('60d97439541b383ed09ffb7d') },
  (error, user) => {
    if (error) {
      return console.log('Unable to fetch data');
    }

    console.log(user);
  }
);
```

## Updating data
Updating data by using updateOne() or updateMany(). In case of update(), it has already predicated. You can use update operators to set the new value to the fields such as $set and $inc.

1. updateOne
```javascript
db.collection('users')
  .updateOne(
    {
      _id: new ObjectID('60d97439541b383ed09ffb7d'),
    },
    {
      $set: {
        name: 'Mike',
      },
    }
  )
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

2. updateMany - update many documents in the same time by put the property that you want to change
```javascript
db.collection('users')
  .updateMany(
    {
      age: 20,
    },
    {
      $set: {
        age: 21,
      },
    }
  )
  .then((result) => {
    console.log(result.modifiedCount);
  })
  .catch((error) => {
    console.log(error);
  });
```

## Deleting data
Deleting data by using deleteOne() and deleteMany() (remove is deprecated). You have to provide criteria for specifying what data you want to delete.
1. deleteOne()
```javascript
db.collection('users')
  .deleteOne({
    name: 'Mike',
  })
  .then((result) => {
    console.log(result);
  })
  .then((error) => {
    console.log(error);
  });
```
2. deleteMany()
```javascript
db.collection('users')
  .deleteMany({
    age: 21,
  })
  .then((result) => {
    console.log(result.modifiedCount);
  })
  .catch((error) => {
    console.log(error);
  });
```

## Mongoose
Mongoose is an elegant MongoDB object modeling for node.js which allow us to write MongoDB validation, API and much more. You can install Mongoose by using `npm i mongoose`. Mongoose uses MongoDB module behind the scene. So, everything you learn in MongoDB, can use in Mongoose.
```javascript
// mongoose.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// defines model to define data type
const User = mongoose.model('User', {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

// create instance to the database
const me = new User({
  name: 'First',
  age: 20,
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log('error', error);
  });
```

## Data Validation and Sanitization
In your node.js file, you can provide validation in the model that you created.
```javascript
const User = mongoose.model('User', {
  name: {
    type: String,
    // this is validation - required
    required: true,
  },
  age: {
    type: Number,
  },
});
```
You can also create your own validation
```javascript 
const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    },
  },
});
```

### validator third-party package for validation
use `npm install validator` to install validator package which can help you validate the input easily. Then, you can apply validator to mongoose.
```javascript
email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is Invalid');
      }
    },
  },
```

## REST API
Representational State Transfer - Application Programming Interface (REST API or RESTful API) is an API used to connect between client and server which user can send request to create, read, update and delete with the data.

## Testing request with Postman
Postman is a good tool for testing request and RESTful API that backend has created.

## Status code
You can learn about status code [here](https://httpstatuses.com/). You can send status code to the user by using `res.status(201).send(user)`. If you not define the specific status code for the response, the user will get 200 OK in every time the request is going well.

## RESTful API for CRUD

### Creating data
```javascript
app.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
```
### Reading data from database
Mongoose model provides methods to deal with query.
1. read all data in the database
```javascript
app.get('/users', async (req, res) => {
  try {
    const users = User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send();
  }
});
```
2. read only single data - you have to send the params in the request to specify what data you want.
```javascript
app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send();
  }
});
```

### Updating data
You can use patch or put request to update data in the database. No need to use set operator like MongoDB without Mongoose. 
Tip: What is the difference between patch and put request? - put will replace everything in the old item but patch will replace just data you send in the body, the other data in the old item will not be replaced.
```javascript
app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  // if one of the items in request.body is not include in
  // allowedUpdates array, return false
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(400).send();
    }

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});
```

### Deleting data
```javascript
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (err) {
    return res.status(500).send();
  }
});
```
### Separate Route Files
When your project has many routes, your file will be long. So, you can separate the routes in many files to make it's easily to manage.
1. Register your router that you want to separate
```javascript
// index.js
const userRouter = require('./routers/user');
...
// register the router of your separate file
app.use(userRouter);
```
2. create separate file to keep routes
```javascript
// user.js
const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
```

## Securely storing Passwords
To make storing passwords be secure, you have to encrypt the password. bcryptjs is a third-party library that change plain text to hash. Hashing cannot reverse, it's one way encryption. So, when the user give us the password, this library will compare the hashed password and the input password. If the result is true, you can log in.
```javascript
const bcrypt = require('bcryptjs');

const myFunction = async () => {
  const password = 'Print123';
  // hash(password, amount of algorithm rounds)
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(hashedPassword); // change every times when hashing

  const isMatch = await bcrypt.compare('Print123', hashedPassword);
  console.log(isMatch); // true
};

myFunction();
```

### Middleware
Middleware are functions which can run before or after the events occur such as you can run middleware before user is saving which change the plain text to hash.
```javascript
// model/user.js
const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is Invalid');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number');
      }
    },
  },
});

// pre or post
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // tell the program to stop run this function
  next();
});

const User = mongoose.model('User', userSchema);
```

## Login users
1. Create userSchema in model to compare email and password with user's data.
```javascript
// model/users.js
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};
```
2. Create new route for logging in
```javascript
// index.js
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});
```
