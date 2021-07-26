import { MongoClient } from 'mongodb';
import Event from '@utils/types/event';

// REMEMBER TO CALL client.close() !!!!
async function connect() {
  const client = new MongoClient(process.env.MONGO_DB_URL as string);
  await client.connect();

  return client;
}

async function getEvents(authorId: string) {
  console.log('fetching from db');
  const client = await connect();
  const data: Event[] = await client
    .db('planner-main')
    .collection('events')
    .find({
      authorId,
    })
    .sort({
      dateTime: 1,
    })
    .toArray();

  client.close();

  return data;
}

async function createEvent(event: Event) {
  const client = await connect();
  await client.db('planner-main').collection('events').insertOne(event);
  client.close();
}

export { getEvents, createEvent };
