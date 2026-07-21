import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI || "";

let clientPromise: Promise<MongoClient>;

if (process.env.MONGODB_URI) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
  }
} else {
  clientPromise = new Promise<MongoClient>((_, reject) => {
    if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
      // Avoid breaking static collection during build phase
    } else {
      reject(new Error("Please add your MONGODB_URI to environment variables"));
    }
  });
}

export default clientPromise;
