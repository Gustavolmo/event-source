'use server';
import { EventData } from '@/app-types/types';
import { GoogleEventResponse } from '../GoogleCalendarType';
import {
  addGuestToListController,
  removeGuestFromList,
} from '../InvitationControls';
import { ObjectId } from 'mongodb';

export const getGoogleEventUpdate = async (
  accessToken: string,
  calendarId: string,
  eventData: EventData[]
) => {
  eventData.forEach(async (event) => {
    const googleRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${event.googleEventId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (googleRes.ok) {
      console.log('Data retrieved successfully');
      const calendarData: GoogleEventResponse = await googleRes.json();

      filterAttendence(calendarData, event)

      // calendarData.attendees.forEach((guest) => {
      //   if (guest.responseStatus === 'accepted') {
      //     addGuestToListController(guest.email, event._id, 'acceptedLive');
      //   }
      //   if (guest.responseStatus === 'tentative') {
      //     addGuestToListController(guest.email, event._id, 'maybeAccepted');
      //   }
      //   if (guest.responseStatus === 'declined') {
      //     addGuestToListController(guest.email, event._id, 'rejected');
      //   }
      //   if (guest.responseStatus === 'needsAction') {
      //     removeGuestFromList(guest.email, event._id, 'acceptedLive');
      //     removeGuestFromList(guest.email, event._id, 'maybeAccepted');
      //     removeGuestFromList(guest.email, event._id, 'rejected');
      //   }
      // });
    } else {
      console.error('Failed to get data', googleRes);
      return false;
    }
  });
};

const filterAttendence = (calendarData: GoogleEventResponse, event: EventData) => {
  calendarData.attendees.forEach((guest) => {
    if (guest.responseStatus === 'accepted') {
      addGuestToListController(guest.email, event._id, 'acceptedLive');
    }
    if (guest.responseStatus === 'tentative') {
      addGuestToListController(guest.email, event._id, 'maybeAccepted');
    }
    if (guest.responseStatus === 'declined') {
      addGuestToListController(guest.email, event._id, 'rejected');
    }
    if (guest.responseStatus === 'needsAction') {
      removeGuestFromList(guest.email, event._id, 'acceptedLive');
      removeGuestFromList(guest.email, event._id, 'maybeAccepted');
      removeGuestFromList(guest.email, event._id, 'rejected');
    }
  });
}