'use server';
import { EventData } from '@/app-types/types';
import { GoogleEventResponse } from '../GoogleCalendarType';
import {
  addGuestToListController,
  removeGuestFromList,
} from '../InvitationControls';

const getGoogleInboundEvent = async (
  accessToken: string,
  calendarId: string,
  eventInboundId: string
) => {
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventInboundId}`,
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
    throw new Error('Failed to get INBOUND event data');
  }
};

const allocatePassengers = (
  calendarData: GoogleEventResponse,
  event: EventData
) => {
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
};

export const updateGoogleInboundEvent = async (
  accessToken: string,
  calendarId: string,
  events: EventData[]
) => {
  try {
    const promises = events.map(async (event) => {
      if (typeof event.googleTransitInboundId !== 'boolean') {
        const calendarData = await getGoogleInboundEvent(
          accessToken,
          calendarId,
          event.googleTransitInboundId
        );
        console.log(calendarData);
        allocatePassengers(calendarData, event);
      }
    });

    await Promise.all(promises);
    console.log('INBOUND events processed successfully.');
  } catch (error) {
    console.error('Error updating INBOUND events:', error);
  }
};
