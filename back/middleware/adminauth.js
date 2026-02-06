const jwt = require('jsonwebtoken');

const adminAuth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied.'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if the token belongs to admin (email-based token)
        if (decoded.id !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: 'Access denied.'
            });
        }

        // Add admin info to request object
        req.admin = {
            email: decoded.id,
            isAdmin: true
        };
        
        next();
        
    } catch (error) {
        console.error('Admin auth middleware error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired.'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = adminAuth;
