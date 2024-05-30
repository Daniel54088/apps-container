import { MongoClient, Db, Collection, Document } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

const uri: string = process.env.MONGODB_URI;

let client: MongoClient;
let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
  return db!;
};

export async function getCollection<T extends Document = Document>(
  collectionName: string
): Promise<Collection<T>> {
  const database = await connectToDatabase();
  return database?.collection<T>(collectionName);
}
