const isAdminMiddleware = (req, res, next) => {
    console.log(req.user.role)
    if (req.user.role !== "Admin") {
      return res.status(403).json({ error: 'Access denied. Only admin users can perform this operation.' });
    }
    next();
  };
  
  module.exports = isAdminMiddleware;
  
