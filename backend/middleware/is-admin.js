module.exports = (req, res, next) => {
  if (req.session.isLoggedIn) {
    if (req.user.level !== 2)
      return res.status(401).json({ errorMsg: "This user is not an admin." });
  }
  next();
};
