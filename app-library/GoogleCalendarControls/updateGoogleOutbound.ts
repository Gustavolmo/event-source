'use server';
import { EventData } from '@/app-types/types';
import { GoogleEventResponse } from '../GoogleCalendarType';
import {
  addGuestToListController,
  removeGuestFromList,
} from '../InvitationControls';

const getGoogleOutboundEvent = async (
  accessToken: string,
  calendarId: string,
  eventOutboundId: string
) => {
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventOutboundId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.ok) {
    const calendarData = await response.json();
    return calendarData as GoogleEventResponse;
  } else {
    throw new Error('Failed to get OUTBOUND data');
  }
};

const allocatePassengers = (
  calendarData: GoogleEventResponse,
  event: EventData
) => {
  calendarData.attendees.forEach((guest) => {
    if (guest.responseStatus === 'accepted') {
      addGuestToListController(guest.email, event._id, 'passengersOutbound');
    }
    if (guest.responseStatus === 'declined') {
      removeGuestFromList(guest.email, event._id, 'passengersOutbound');
    }
    if (guest.responseStatus === 'needsAction') {
      removeGuestFromList(guest.email, event._id, 'passengersOutbound');
    }
  });
};

export const updateGoogleOutboundEvent = async (
  accessToken: string,
  calendarId: string,
  events: EventData[]
) => {
  try {
    const promises = events.map(async (event) => {
      if (
        typeof event.googleTransitFromId !== 'boolean' &&
        event.transportCheck &&
        event.roundTripCheck
      ) {
        const calendarData = await getGoogleOutboundEvent(
          accessToken,
          calendarId,
          event.googleTransitFromId
        );
        console.log('Update OUTBOUND activated');
        allocatePassengers(calendarData, event);
      }
    });

    await Promise.all(promises);
    console.log('OUTBOUND events processed successfully.');
  } catch (error) {
    console.error('Error updating OUTBOUND events:', error);
  }
};
