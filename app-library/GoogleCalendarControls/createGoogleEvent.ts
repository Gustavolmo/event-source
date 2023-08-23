'use server';
import { EventData } from '@/app-types/types';
import { GoogleCalendarEvent } from '../GoogleCalendarType';
import { v4 } from 'uuid';




const translateFromEvent = async (eventData: EventData) => {
  const calendarEvent: GoogleCalendarEvent = {
    //ALWAYS TRUE
    summary: eventData.eventTitle,
    attendees: eventData.invited.map((email) => ({ email: email })),
  };

  calendarEvent.description = `<b>Transit Fee:</b> ${eventData.transportCost}kr <br> <b>--> TRANSIT: </b> ${eventData.transportDescription}`;

  return calendarEvent;
};




const translateInboundEvent = async (eventData: EventData) => {
  const calendarEvent: GoogleCalendarEvent = {
    //ALWAYS TRUE
    summary: eventData.eventTitle,
    attendees: eventData.invited.map((email) => ({ email: email })),
  };

  calendarEvent.description = `<b>Transit Fee:</b> ${eventData.transportCost}kr <br> <b>--> TRANSIT: </b> ${eventData.transportDescription}`;

  return calendarEvent;
};




const translateEvent = async (eventData: EventData) => {
  const calendarEvent: GoogleCalendarEvent = {
    //ALWAYS TRUE
    summary: eventData.eventTitle,
    attendees: eventData.invited.map((email) => ({ email: email })),
  };

  if (eventData.eventCheck) {
    //ONLY EVENT
    calendarEvent.location = eventData.eventLocation;
    calendarEvent.description = `<b>Fee:</b> ${eventData.eventCost}kr <br> <b>--> ABOUT: </b> ${eventData.eventDescription}`;

    calendarEvent.start = {
      dateTime: `${eventData.eventDate}T${eventData.eventTime}:00`,
      timeZone: 'CET',
    };
    calendarEvent.end = {
      dateTime: `${eventData.eventDate}T${eventData.eventEndTime}:00`,
      timeZone: 'CET',
    };

    if (eventData.multiDayCheck)
      calendarEvent.end = {
        dateTime: `${eventData.eventEndDate}T${eventData.eventEndTime}:00`,
        timeZone: 'CET',
      };

    if (eventData.googleLinkCheck) {
      const uniqueRequestId = v4();
      calendarEvent.conferenceData = {
        // conferenceDataVersion: '1',
        createRequest: {
          requestId: uniqueRequestId,
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      };
    }
  }

  return calendarEvent as GoogleCalendarEvent;
};












const postGoogleEvent = async (
  accessToken: string,
  calendarId: string,
  newEvent: GoogleCalendarEvent
) => {
  const googleRes = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    }
  );

  if (googleRes.ok) {
    console.log('Event created successfully');
    const newEventData = await googleRes.json();
    return newEventData;
  } else {
    console.error('Failed to create event:', googleRes);
    return false;
  }
};




// const requestGoogleMeetLink = async (
//   calendarId: string,
//   accessToken: string,
//   uniqueRequestId: string,
//   calendarEvent: GoogleCalendarEvent
// ) => {
//   const conferenceRes = await fetch(
//     `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${uniqueRequestId}/conferenceData/createRequest`,
//     {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(calendarEvent.conferenceData),
//     }
//   );

//   if (conferenceRes.ok) {
//     const conferenceData = await conferenceRes.json();
//     console.log(conferenceData);
//     return conferenceData;
//   } else {
//     console.error('Failed to create conference:', conferenceRes);
//     return;
//   }
// };

























export const createGoogleEvent = async (
  accessToken: string,
  calendarId: string,
  eventData: EventData
) => {
  const newEvent = await translateEvent(eventData);
  const googleRes = await postGoogleEvent(accessToken, calendarId, newEvent);

  // const uniqueId = newEvent.conferenceData?.createRequest?.requestId;
  // if (uniqueId) await requestGoogleMeetLink(calendarId, accessToken, uniqueId, newEvent);

  return googleRes as GoogleCalendarEvent;
};




export const createInboudGoogleEvent = async (
  accessToken: string,
  calendarId: string,
  eventData: EventData
) => {
  const newEvent = await translateInboundEvent(eventData);
  const googleInboudRes = await postGoogleEvent(
    accessToken,
    calendarId,
    newEvent
  );

  return googleInboudRes as GoogleCalendarEvent;
};




export const createFromGoogleEvent = async (
  accessToken: string,
  calendarId: string,
  eventData: EventData
) => {
  const newEvent = await translateFromEvent(eventData);
  const googleFromRes = await postGoogleEvent(
    accessToken,
    calendarId,
    newEvent
  );

  return googleFromRes;
};
