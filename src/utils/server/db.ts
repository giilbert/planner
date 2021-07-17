import { MongoClient } from 'mongodb';
import Event from '@utils/types/event';

async function connect() {
  const client = new MongoClient(process.env.MONGO_DB_URL as string);
  await client.connect();

  return client;
}

async function getEvents(authorId: string) {
  const client = await connect();
  const data: Event[] = await client
    .db('planner-main')
    .collection('events')
    .find({
      authorId,
    })
    .toArray();

  return data;
}

export { getEvents };
