adminCheck = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }

  res.status(401).send('User not admin');
};

module.exports = adminCheck;