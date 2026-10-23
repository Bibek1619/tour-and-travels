import { MongoClient } from 'mongodb';

const uri = 'mongodb://admin:bibekhero@stellar-shard-00-00.kg2kf.mongodb.net:27017,stellar-shard-00-01.kg2kf.mongodb.net:27017,stellar-shard-00-02.kg2kf.mongodb.net:27017/tour-and-travels?ssl=true&replicaSet=atlas-m9kgbo-shard-0&authSource=admin&appName=Stellar';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('tour-and-travels');
    
    // First, show what exists
    const adventures = await db.collection('adventures').find({}).toArray();
    console.log('\nCurrent adventures:');
    adventures.forEach(a => console.log(`- ${a.title} (category: ${a.category})`));
    
    // Delete adventures that are NOT bungee or paragliding
    const result = await db.collection('adventures').deleteMany({
      category: { $nin: ['bungee', 'paragliding'] }
    });
    
    console.log(`\n✅ Deleted ${result.deletedCount} adventures (kept only bungee and paragliding)`);
    
    // Show remaining
    const remaining = await db.collection('adventures').find({}).toArray();
    console.log('\n✅ Remaining adventures:');
    remaining.forEach(a => console.log(`- ${a.title} (category: ${a.category})`));
    
  } finally {
    await client.close();
  }
}

run().catch(console.error);
