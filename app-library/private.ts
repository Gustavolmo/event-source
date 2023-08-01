'use server';
import { EventData, User } from '@/app-types/types';
import { client, runMongoDb } from './mongoConnect';
import { MutableRefObject } from 'react';

runMongoDb();
const databaseName = 'eventsource';
const collectionUser = 'user';
const collectionEvent = 'event';
const userCollection = client.db(databaseName).collection(collectionUser);
const eventCollection = client.db(databaseName).collection(collectionEvent);

// NEW USERS ->
export const createNewUserIfFirstLogin = async (userData: User) => {
  try {
    if (userData.email) {
      const userDbEntry = await userCollection.findOne({
        email: userData.email,
      });
      if (!userDbEntry) {
        await userCollection.insertOne(userData);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

// NEW EVENT ->
export const createNewEvent = (userEmail: User['email'], event: EventData) => {
  console.log(event);
};

/* FUTURE GOOGLE CALENDAR IMPLEMENTATION
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
