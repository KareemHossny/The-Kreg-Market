const cloudinary = require('cloudinary').v2;

const connectingcloudinary = async () => {
    try {
        // Check if environment variables are available
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            console.log('⚠️  Cloudinary environment variables not found. Image uploads will not work.');
            console.log('Please set the following environment variables:');
            console.log('- CLOUDINARY_CLOUD_NAME');
            console.log('- CLOUDINARY_API_KEY');
            console.log('- CLOUDINARY_API_SECRET');
            return false;
        }
        
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        
        // Test the configuration
        const result = await cloudinary.api.ping();
        if (result.status === 'ok') {
            console.log('✅ Cloudinary configured successfully');
            return true;
        } else {
            console.log('❌ Cloudinary configuration test failed');
            return false;
        }
    } catch (error) {
        console.log('❌ Error configuring Cloudinary:', error.message);
        return false;
    }
};

module.exports = connectingcloudinary;