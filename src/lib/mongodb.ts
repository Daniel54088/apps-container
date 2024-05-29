import { MongoClient, Db, Collection, Document } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

const uri: string =
  process.env.MONGODB_URI ||
  "mongodb+srv://s981743:vLDVekkMvAVheH48@cluster0.difgmcl.mongodb.net/code-test";

let client: MongoClient;
let db: Db;

export const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();
  }
  return db;
};

export async function getCollection<T extends Document = Document>(
  collectionName: string
): Promise<Collection<T>> {
  const database = await connectToDatabase();
  return database?.collection<T>(collectionName);
}
