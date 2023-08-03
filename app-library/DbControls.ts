'use server';
import { EventData, User, UserPreferences } from '@/app-types/types';
import { client, runMongoDb } from './mongoConnect';

runMongoDb();
const databaseName = 'eventsource';
const collectionUser = 'user';
const collectionEvent = 'event';
const userCollection = client.db(databaseName).collection(collectionUser);
const eventCollection = client.db(databaseName).collection(collectionEvent);

// CREATE NEW USERS ->
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

// UPDATE USER PREFERENCES ->
export const updateUserPreferences = async (userEmail: User['email'], userPreferences: UserPreferences) => {
  console.log(userPreferences)
  try {
    const query = { email: userEmail };
    const update = { $set: { dietaryRestrictions: userPreferences.dietaryRestrictions, accessibilityNeeds: userPreferences.accessibilityNeeds } };
    await userCollection.updateOne(query, update);
  } catch (e) {
    console.error(e);
  }
}

// NEW EVENT ->
export const createNewEvent = async (userEmail: User['email'], event: EventData) => {
  try {
    const userDbEntry = await userCollection.findOne({
      email: userEmail,
    });
    if (userDbEntry) {
      event.organizerId = String(userDbEntry._id);
      await eventCollection.insertOne(event);
      console.log(event)
      return true
    } else {
      return false
    }
  } catch (e) {
    console.error(e);
  }
};





/*
================================================
FUTURE GOOGLE CALENDAR IMPLEMENTATION
================================================

export const updateCalendarForInvitedUsers = async (newEvent) => {
  const invitedUsers = newEvent.invited;
  const accessTokenPromises = invitedUsers.map(async (email) => {
    const response = await fetch('/api/update-calendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        event: newEvent
      })
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to retrieve access token');
  });

  const accessTokens = await Promise.all(accessTokenPromises);

  const createEventPromises = accessTokens.map(async (accessToken) => {
    const response = await fetch('/api/create-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessToken,
        event: newEvent
      })
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to create event');
  });

  await Promise.all(createEventPromises);

  console.log('Event created successfully for all invited users');
};
*/
