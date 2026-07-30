require('dotenv').config();
const { cloudinary } = require('./config/cloudinary');

console.log('🔍 Testing Cloudinary Configuration...\n');

console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');

// Test connection
cloudinary.api.ping()
  .then((result) => {
    console.log('\n✅ Cloudinary connection successful!');
    console.log('Status:', result.status);
    console.log('\n🎉 You can now upload images to Cloudinary!');
    process.exit(0);
  })
  .catch((error) => {
    console.log('\n❌ Cloudinary connection failed!');
    console.error('Error:', error.message);
    console.log('\n💡 Check your credentials in .env file');
    process.exit(1);
  });
