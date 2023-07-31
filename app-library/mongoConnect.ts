import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'

dotenv.config()

const pw = process.env.MONGO_PW
const uri = `mongodb+srv://gustavolmo:${pw}@logacluster.fpmn1bl.mongodb.net/?retryWrites=true&w=majority`;

export const client: MongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function closeConnection() {
  console.log('Disconnecting...');
  try {
    await client.close();
    console.log('Disconnected');
  } catch (err) {
    console.error(err)
  } finally {
    process.exit();
  }
}

export async function runMongoDb() {
  try {
    await client.connect();
    process.on('SIGTERM', closeConnection);
    process.on('SIGINT', closeConnection);
  } catch (err) {
    console.error(err)
  }
}

export default {
  client,
  runMongoDb
}