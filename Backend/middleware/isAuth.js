


// const jwt = require('jsonwebtoken');

// // Auth middleware: Verify JWT token and attach user info
// const isAuth = (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ message: "Authentication token is missing" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     req.userRole = decoded.role;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

// // Role-based guards
// const isWasherman = (req, res, next) => {
//   if (req.userRole !== 'washerman') {
//     return res.status(403).json({ message: "Washerman access only" });
//   }
//   next();
// };

// const isCustomer = (req, res, next) => {
//   if (req.userRole !== 'customer') {
//     return res.status(403).json({ message: "Customer access only" });
//   }
//   next();
// };

// module.exports = { isAuth, isWasherman, isCustomer };






// const jwt = require('jsonwebtoken');

// const isAuth = (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     req.userRole = decoded.role;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: "Unauthorized" });
//   }
// };

// // Role check middleware
// const isWasherman = (req, res, next) => {
//   if (req.userRole !== 'washerman') return res.status(403).json({ message: "Washerman access only" });
//   next();
// };

// const isCustomer = (req, res, next) => {
//   if (req.userRole !== 'customer') return res.status(403).json({ message: "Customer access only" });
//   next();
// };

// module.exports = { isAuth, isWasherman, isCustomer };












const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  try {
    let token;

    // ✅ First, check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // ✅ Fallback: check cookies
    else if (req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(403).json({ message: "Unauthorized", error: err.message });
  }
};

const isWasherman = (req, res, next) => {
  if (req.userRole !== 'washerman') return res.status(403).json({ message: "Washerman access only" });
  next();
};

const isCustomer = (req, res, next) => {
  if (req.userRole !== 'customer') return res.status(403).json({ message: "Customer access only" });
  next();
};


const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin access only" });
  next();
};

module.exports = { isAuth, isWasherman, isCustomer, isAdmin };
