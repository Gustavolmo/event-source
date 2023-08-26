'use server';
import { EventData } from '@/app-types/types';
import { GoogleEventResponse } from '../GoogleCalendarType';
import {
  addGuestToListController,
  removeGuestFromList,
} from '../InvitationControls';

// export const getGoogleEventUpdate = async (
//   accessToken: string,
//   calendarId: string,
//   eventData: EventData[]
// ) => {
//   eventData.forEach(async (event) => {
//     const googleRes = await fetch(
//       `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${event.googleEventId}`,
//       {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     if (googleRes.ok) {
//       console.log('Data retrieved successfully');
//       const calendarData: GoogleEventResponse = await googleRes.json();
//       console.log(calendarData)
//       filterAttendence(calendarData, event)

//     } else {
//       console.error('Failed to get data', googleRes);
//       return false;
//     }
//   });
// };

const getGoogleEvent = async (
  accessToken: string,
  calendarId: string,
  eventId: string
) => {
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
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
    throw new Error('Failed to get event data');
  }
};

const filterAttendence = (
  calendarData: GoogleEventResponse,
  event: EventData
) => {
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
};

const updateEventFromCalendar = () => {};

export const updateGoogleEvents = async (
  accessToken: string,
  calendarId: string,
  events: EventData[]
) => {
  try {
    const promises = events.map(async (event) => {
      if (typeof event.googleEventId !== 'boolean') {
        const calendarData = await getGoogleEvent(
          accessToken,
          calendarId,
          event.googleEventId
        );
        console.log(calendarData)
        filterAttendence(calendarData, event);
      }
    });

    await Promise.all(promises);
    console.log('All events processed successfully.');
  } catch (error) {
    console.error('Error updating events:', error);
  }
};

