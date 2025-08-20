// middleware/auth.js
const supabase = require('../utils/supabase');

const authenticateUser = async (req, res, next) => {
  // 1) Prefer httpOnly cookie
  let token = req.cookies['sb-access-token'];

  // 2) Fallback to Authorization header if present
  const authHeader = req.headers.authorization;
  if (!token && authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Invalid or expired token' });
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = { authenticateUser };
