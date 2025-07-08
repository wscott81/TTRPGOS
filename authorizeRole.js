const { userHasRole } = require('../models/roleModel');

function authorizeRole(requiredRole) {
  return (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    if (!userHasRole(userId, requiredRole)) {
      return res.status(403).json({ error: 'Forbidden - insufficient role' });
    }

    next();
  };
}

module.exports = authorizeRole;

