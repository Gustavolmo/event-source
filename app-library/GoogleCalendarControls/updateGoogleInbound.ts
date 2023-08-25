'use server';
import { EventData } from '@/app-types/types';
import { GoogleEventResponse } from '../GoogleCalendarType';
import {
  addGuestToListController,
  removeGuestFromList,
} from '../InvitationControls';

export const getGoogleEventUpdateInbound = async (
  accessToken: string,
  calendarId: string,
  eventData: EventData[]
) => {
  eventData.forEach(async (event) => {
    const googleRes = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${event.googleTransitInboundId}`,
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

      calendarData.attendees.forEach((guest) => {
        if (guest.responseStatus === 'accepted') {
          addGuestToListController(guest.email, event._id, 'passengersInbound');
        }
        if (guest.responseStatus === 'declined') {
          removeGuestFromList(guest.email, event._id, 'passengersInbound');
        }
        if (guest.responseStatus === 'needsAction') {
          removeGuestFromList(guest.email, event._id, 'passengersInbound');
        }
      });
    } else {
      console.error('Failed to get data', googleRes);
      return false;
    }
  });
};
