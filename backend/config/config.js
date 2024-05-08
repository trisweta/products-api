module.exports = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/products_api',

    JWT_SECRET: process.env.JWT_SECRET || 'key_123',
  
    PORT: process.env.PORT || 3000
  };
  