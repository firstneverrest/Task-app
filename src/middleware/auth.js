const jwt = require('jsonwebtoken');
const User = require('../models/user');

// user have to provide token via header in the request to authorize
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'myProject');
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;
