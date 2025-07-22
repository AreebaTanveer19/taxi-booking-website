// Admin middleware using .env credentials
module.exports = function adminOnly(req, res, next) {
  console.log('Received credentials:', req.body);
  console.log('Expected credentials:', {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
  });
  
  const { username, password } = req.body;
  
  if (username === process.env.ADMIN_USERNAME && 
      password === process.env.ADMIN_PASSWORD) {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Access denied: Admins only.' });
};