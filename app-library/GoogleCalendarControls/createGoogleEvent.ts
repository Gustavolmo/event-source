'use server';
import { EventData } from '@/app-types/types';
import { GoogleCalendarEvent } from '../GoogleCalendarType';
import { v4 } from "uuid";












// CREATE EVENT ON GOOGLE CALENDAR
export const createGoogleEvent = async (
  accessToken: string,
  calendarId: string,
  eventData: EventData
) => {
  const newEvent = eventDataToCalendarFormat(eventData);

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
    return newEventData.id;
  } else {
    console.error('Failed to create event:', googleRes);
    return false;
  }
};

















// TRANSFORM eventData TO calendarFormat
export const eventDataToCalendarFormat = (eventData: EventData) => {
  const calendarEvent: GoogleCalendarEvent = {
    summary: eventData.eventTitle,
    location: eventData.eventLocation,
    description: `<b>--> ABOUT: </b> ${eventData.eventDescription}`,

    attendees: eventData.invited.map((email) => ({ email: email })),

    start: {
      dateTime: `${eventData.eventDate}T${eventData.eventTime}:00`,
      timeZone: 'CET',
    },
    end: {
      dateTime: `${eventData.eventDate}T${eventData.eventEndTime}:00`,
      timeZone: 'CET',
    },
  };




  if (eventData.multiDayCheck) {
    calendarEvent.end = {
      dateTime: `${eventData.eventEndDate}T${eventData.eventEndTime}:00`,
      timeZone: 'CET',
    };
  }




  if (eventData.googleLinkCheck) { // MISSING SOMETHING HERE <---- X
    const uniqueRequestId = v4();
    calendarEvent.conferenceData = {
      createRequest: {
        requestId: uniqueRequestId,
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    };
  }




  // if (eventData.transportCheck) {
  //   calendarEvent.description = `<b>--> ABOUT: </b> ${eventData.eventDescription} <br><br> <b>--> TRANSIT: </b> ${eventData.transportDescription}`;
  // }



  
  console.log(calendarEvent);
  return calendarEvent;
};
