const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// register router
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

const jwt = require('jsonwebtoken');

const myFunction = async () => {
  // sign({data},secret, options)
  const token = jwt.sign({ _id: 'abc123' }, 'myProject', {
    expiresIn: '7 days',
  });
  console.log(token);

  // return payload if it's true
  const data = jwt.verify(token, 'myProject');
  console.log(data);
};

myFunction();
