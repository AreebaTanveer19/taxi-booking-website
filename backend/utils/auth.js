// Secure admin middleware
module.exports = function adminOnly(req, res, next) {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }
  
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && 
      password === process.env.ADMIN_PASSWORD) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Access denied' });
};