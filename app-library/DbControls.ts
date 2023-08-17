'use server';
import { EventData, User, UserPreferences, DbData } from '@/app-types/types';
import { client, runMongoDb } from './mongoConnect';
import { ObjectId } from 'mongodb';

runMongoDb();
const databaseName = 'eventsource';
const collectionUser = 'user';
const collectionEvent = 'event';
const userCollection = client.db(databaseName).collection(collectionUser);
const eventCollection = client.db(databaseName).collection(collectionEvent);

// CREATE NEW USER ->
export const createNewUserIfFirstLogin = async (userData: User) => {
  try {
    if (userData.email) {
      const userDbEntry = await userCollection.findOne({
        email: userData.email,
      });
      if (!userDbEntry) {
        await userCollection.insertOne(userData);
        return true;
      } else {
        return false;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

// UPDATE USER PREFERENCES
export const updateUserPreferences = async (
  userEmail: User['email'],
  userPreferences: UserPreferences
) => {
  try {
    const query = { email: userEmail };
    const update = {
      $set: {
        name: userPreferences.name,
        dietaryRestrictions: userPreferences.dietaryRestrictions,
        accessibilityNeeds: userPreferences.accessibilityNeeds,
      },
    };
    await userCollection.updateOne(query, update);
  } catch (e) {
    console.error(e);
  }
};

// CREATE NEW EVENT
export const createNewEvent = async (
  userEmail: User['email'],
  event: EventData
) => {
  try {
    const userDbEntry = await userCollection.findOne({
      email: userEmail,
    });
    if (userDbEntry) {
      event.organizerId = String(userDbEntry._id);
      event.invited = Array.from(
        new Set(event.invited.map((email) => email?.toLowerCase()))
      );

      await eventCollection.insertOne(event);
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.error(e);
  }
};

// GET ALL USER EVENTS
export const getAllUserEvents = async (userEmail: User['email']) => {
  try {
    const userDbEntry = await userCollection.findOne({
      email: userEmail,
    });
    if (userDbEntry) {
      const userId = String(userDbEntry._id);
      const allMyEvents = await eventCollection
        .find({ organizerId: userId })
        .toArray();
      return allMyEvents as DbData[];
    }
  } catch (e) {
    console.error(e);
  }
};

// GET USER PREFERENCES
export const getUserPreferences = async (
  userEmail: User['email']
): Promise<DbData[] | undefined> => {
  try {
    const dbData = await userCollection.findOne({
      email: userEmail,
    });
    if (dbData) {
      return [dbData] as DbData[];
    } else {
      return;
    }
  } catch (e) {
    console.error(e);
  }
};

// GET USER INVITATIONS
export const getUserInvitations = async (userEmail: User['email']) => {
  try {
    const data = await eventCollection.find({ invited: userEmail }).toArray();
    return data as DbData[];
  } catch (e) {
    console.error(e);
  }
};

// ADD UNIQUE USERS TO EVENT BY ID
export const addUsersToEvent = async (
  guestEmails: User['email'][],
  eventId: EventData['_id']
) => {
  try {
    const targetEvent = (await eventCollection.findOne({
      _id: new ObjectId(eventId),
    })) as EventData;

    const noRepeatedEmail = Array.from(
      new Set(guestEmails.map((email) => email?.toLowerCase()))
    );
    const uniqueNewEmails = noRepeatedEmail.filter(
      (email) => !targetEvent.invited.includes(String(email))
    );

    await eventCollection.updateOne(
      { _id: new ObjectId(eventId) },
      { $push: { invited: { $each: uniqueNewEmails } } }
    );
  } catch (e) {
    console.error(e);
  }
};

// DELETE EVENT BY ID
export const deleteEvent = async (eventId: EventData['_id']) => {
  try {
    await eventCollection.deleteOne({ _id: new ObjectId(eventId) });
  } catch (e) {
    console.error(e);
  }
};

// DELETE USER BY EMAIL
export const deleteUser = async (userEmail: User['email']) => {
  try {
    const user = await userCollection.findOne({ email: userEmail });
    await eventCollection.deleteMany({ organizerId: String(user?._id) });
    await userCollection.deleteOne({ _id: user?._id });
  } catch (e) {
    console.error(e);
  }
};
