const jwt = require('jsonwebtoken');
const User = require('../models/User')

const protect = async(req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split("")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch(error) {
            res.status(401).json({message:"Not authorized, token failed"})
        }
    }

    else {
        res.status(401).json({message: "Not authorized, no token"})
    }
};

//Middleware to check roles
const authorize = (...roles) => {
    return(req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message: "Access denied: insufficient permissions"})
        }
        next();
    };
};


//Check for admin role status
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); //User is admin, proceed to the next middleware or route
    } else {
        res.status(403).json({message: "Access denied: Admin privileges required"})
    }
};

module.exports = {protect, authorize, isAdmin};
