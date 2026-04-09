/**
 * Middleware factory to enforce role-based access control.
 * * @param {string[]} allowedRoles - An array of roles permitted to access the route.
 * @returns {Function} Express middleware function
 */
export const roleGuard = (allowedRoles) => {
  return (req, res, next) => {
    // We assume a previous authentication middleware (like JWT verification) 
    // has already run and attached the decoded user payload to req.user
    const user = req.user;

    // 1. Check if the user object exists on the request
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized: Authentication required.' 
      });
    }

    // 2. Extract the user's role (using 'userType' based on our Prisma schema)
    const userRole = user.userType;

    // 3. Check if the user's role is in the list of allowed roles
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        success: false, 
        message: `Forbidden: Access denied for role '${userRole}'.` 
      });
    }

    // 4. User is authorized! Pass control to the next middleware or route handler
    next();
  };
};