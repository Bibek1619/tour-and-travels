const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();

const categories = [
  { name: 'White Water Rafting', slug: 'rafting', description: 'Experience thrilling rapids on Nepal\'s pristine rivers', order: 1 },
  { name: 'Kayaking', slug: 'kayaking', description: 'Master the art of kayaking in stunning locations', order: 2 },
  { name: 'Paragliding', slug: 'paragliding', description: 'Soar above mountains with breathtaking aerial views', order: 3 },
  { name: 'Bungee Jumping', slug: 'bungee', description: 'Take the ultimate leap of faith from extreme heights', order: 4 },
  { name: 'Zip Lining', slug: 'zipline', description: 'Fly at high speeds on world-class ziplines', order: 5 },
  { name: 'Canyoning', slug: 'canyoning', description: 'Explore canyons through rappelling and swimming', order: 6 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    for (const cat of categories) {
      const exists = await Category.findOne({ slug: cat.slug });
      if (!exists) {
        await Category.create(cat);
        console.log(`Created: ${cat.name}`);
      } else {
        console.log(`Already exists: ${cat.name}`);
      }
    }

    console.log('Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
