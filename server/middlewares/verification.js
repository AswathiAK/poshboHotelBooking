require('dotenv').config();
const jwt = require('jsonwebtoken');
const createError = require('./errorHandling');

const verifyUserToken = (req, res, next) => {
  const token = req.cookies.userToken; 
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.user = user; 
    next();
  });
};
const verifyAdminToken = (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }
  jwt.verify(token, process.env.JWT_ADMINSECRET, (err, admin) => {
    if (err) return next(createError(403, "Token is not valid"));
    req.admin = admin;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyUserToken(req, res, (err) => { 
    if (err) return next(err);
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(createError(403, "you are not authorized"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyAdminToken(req, res, (err) => {
    if (err) return next(err);
    if (req.admin) {
      next();
    } else {
      return next(createError(403, "you are not authorized"));
    }
  });
};

const verifyHotel = (req, res, next) => {
  verifyUserToken(req, res, (err) => {
    if (err) return next(err); console.log(req.user);
    if (req.user.role==='host') {
      next();
    } else {
      return next(createError(403, "you are not authorized"));
    }
  });
};

module.exports = {
  verifyUser,
  verifyAdmin,
  verifyHotel
};