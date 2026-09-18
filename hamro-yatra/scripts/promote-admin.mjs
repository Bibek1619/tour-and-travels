import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "";
const email = process.env.SEED_EMAIL || "";

async function main() {
  if (!uri || !email) {
    console.error("MONGO_URI and SEED_EMAIL are required");
    process.exit(1);
  }
  const client = new MongoClient(uri);
  await client.connect();
  const users = client.db().collection("user");
  const res = await users.updateOne(
    { email },
    { $set: { role: "admin", emailVerified: true } },
    { upsert: false }
  );
  console.log("updateOne result:", JSON.stringify(res));
  const user = await users.findOne({ email });
  console.log("user:", JSON.stringify(user));
  await client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});