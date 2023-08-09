'use server';
import { EventData, User, UserPreferences, DbData } from '@/app-types/types';
import { client, runMongoDb } from './mongoConnect';
import { ObjectId } from 'mongodb';

runMongoDb();
const databaseName = 'eventsource';
const collectionEvent = 'event';
const eventCollection = client.db(databaseName).collection(collectionEvent);

// REMOVE GUEST FROM A LIST
export const removeGuestFromList = async (
  userEmail: User['email'],
  eventId: EventData['_id'],
  listName: string
) => {
  try {
    await eventCollection.updateOne(
      { _id: new ObjectId(eventId) },
      { $pull: { [listName]: userEmail } }
    );
  } catch (e) {
    console.error(e);
  }
};

// ADD GUEST TO LIST CONTROL
export const addGuestToListController = async (
  userEmail: User['email'],
  eventId: EventData['_id'],
  listName: string
) => {
  try {
    const event = await eventCollection.findOne({ _id: new ObjectId(eventId) });

    switch (listName) {

      case 'acceptedLive':
        if (event && !event.acceptedLive.includes(userEmail)) {
          await removeGuestFromList(userEmail, eventId, 'acceptedVirtually')
          await removeGuestFromList(userEmail, eventId, 'rejected')
          await eventCollection.updateOne(
            { _id: new ObjectId(eventId) },
            { $push: { [listName]: userEmail } }
          );
        }
        break;

      case 'acceptedVirtually':
      if (event && !event.acceptedVirtually.includes(userEmail)) {
        await removeGuestFromList(userEmail, eventId, 'acceptedLive')
        await removeGuestFromList(userEmail, eventId, 'rejected')
        await eventCollection.updateOne(
          { _id: new ObjectId(eventId) },
          { $push: { [listName]: userEmail } }
        );
      }
      break;

      case 'rejected':
        if (event && !event.rejected.includes(userEmail)) {
          await removeGuestFromList(userEmail, eventId, 'acceptedLive')
          await removeGuestFromList(userEmail, eventId, 'acceptedVirtually')
          await eventCollection.updateOne(
            { _id: new ObjectId(eventId) },
            { $push: { [listName]: userEmail } }
          );
        }
        break;

      case 'passengers':
        if (event && !event.passengers.includes(userEmail)) {
          await eventCollection.updateOne(
            { _id: new ObjectId(eventId) },
            { $push: { [listName]: userEmail } }
          );
        }
        break;

      default:
        console.warn('listName parameter in addGuestToListController has no match')
    }
  } catch (e) {
    console.error(e);
  }
};
