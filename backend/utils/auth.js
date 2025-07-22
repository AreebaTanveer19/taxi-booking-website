// Admin middleware (demo version)
module.exports = function adminOnly(req, res, next) {
  // For demo: check for a header 'x-admin-token' with value 'secret-admin-token'
  // In production, use JWT or session auth!
  const token = req.headers['x-admin-token'];
  if (token === 'secret-admin-token') {
    return next();
  }
  return res.status(403).json({ success: false, message: 'Access denied: Admins only.' });
}; 