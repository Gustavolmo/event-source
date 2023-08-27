'use server';
import { EventData } from '@/app-types/types';
import { GoogleCalendarEvent } from '../GoogleCalendarType';
// import { v4 } from 'uuid';

const translateInboundEvent = async (eventData: EventData) => {
  const startDate = new Date(
    `${eventData.pickupDate}T${eventData.pickupTime}:00`
  );
  const eventDurationInMinutes = eventData.travelTime;
  const endDate = new Date(
    startDate.getTime() + eventDurationInMinutes * 60 * 1000
  );

  const calendarEvent: GoogleCalendarEvent = {
    //ALWAYS TRUE
    summary: `(INBOUND) ${eventData.eventTitle}`,
    attendees: eventData.invited.map((email) => ({ email: email })),
  };

  calendarEvent.description = `<b>From: </b>${eventData.pickupLocation}<br><b>To: </b>${eventData.dropOffLocation}<br>
<b>Vehicle: </b>${eventData.transportMode}<br><b>Transit Fee: </b>${eventData.transportCost}kr<br><b>Total Seats: </b>${eventData.seatsAvailable}
<br>
<b>ABOUT:</b> ${eventData.transportDescription}
<br>
<b>ADD DIET RESTRICTIONS & MORE?</b><br>event-sauce.vercel.app/account`;

  calendarEvent.location = eventData.pickupLocation;

  calendarEvent.start = {
    dateTime: startDate.toISOString(),
    timeZone: eventData.timeZone,
  };
  calendarEvent.end = {
    dateTime: endDate.toISOString(),
    timeZone: eventData.timeZone,
  };

  return calendarEvent as GoogleCalendarEvent;
};

const translateEvent = async (eventData: EventData) => {
  const startDate = new Date(
    `${eventData.eventDate}T${eventData.eventTime}:00`
  );
  const endDate = new Date(
    `${eventData.eventDate}T${eventData.eventEndTime}:00`
  );
  const endAnotherDate = new Date(
    `${eventData.eventEndDate}T${eventData.eventEndTime}:00`
  );

  const calendarEvent: GoogleCalendarEvent = {
    //ALWAYS TRUE
    summary: eventData.eventTitle,
    attendees: eventData.invited.map((email) => ({ email: email })),
  };

  if (eventData.eventCheck) {
    //ONLY EVENT
    calendarEvent.location = eventData.eventLocation;
    calendarEvent.description = `<br><b>Event Fee:</b> ${eventData.eventCost}kr
<br><b>ABOUT: </b>${eventData.eventDescription}
<br><br><b>DIET RESTRICTIONS & MORE ON:</b><br><b>event-sauce.vercel.app/account</b>`;

    calendarEvent.start = {
      dateTime: startDate.toISOString(),
      timeZone: 'CET',
    };
    calendarEvent.end = {
      dateTime: endDate.toISOString(),
      timeZone: 'CET',
    };

    if (eventData.multiDayCheck)
      calendarEvent.end = {
        dateTime: endAnotherDate.toISOString(),
        timeZone: 'CET',
      };
  }

  return calendarEvent as GoogleCalendarEvent;
};

const translateFromEvent = async (eventData: EventData) => {
  const startDate = new Date(
    `${eventData.returnDate}T${eventData.returnTime}:00`
  );
  const eventDurationInMinutes = eventData.travelTime;
  const endDate = new Date(
    startDate.getTime() + eventDurationInMinutes * 60 * 1000
  );

  const calendarEvent: GoogleCalendarEvent = {
    //ALWAYS TRUE
    summary: `(OUTBOUND) ${eventData.eventTitle}`,
    attendees: eventData.invited.map((email) => ({ email: email })),
  };

  calendarEvent.description = `<b>From: </b>${eventData.dropOffLocation}<br><b>To: </b>${eventData.pickupLocation}<br>
<b>Vehicle: </b>${eventData.transportMode}<br><b>Transit Fee: </b>${eventData.transportCost}kr<br><b>Total Seats: </b>${eventData.seatsAvailable}
<br>
<b>ABOUT:</b> ${eventData.transportDescription}
<br>
<b>ADD DIET RESTRICTIONS & MORE ON:</b><br>event-sauce.vercel.app/account`;

  calendarEvent.location = eventData.dropOffLocation;

  calendarEvent.start = {
    dateTime: startDate.toISOString(),
    timeZone: 'CET',
  };
  calendarEvent.end = {
    dateTime: endDate.toISOString(),
    timeZone: 'CET',
  };

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

export const createGoogleEvent = async (
  accessToken: string,
  calendarId: string,
  eventData: EventData
) => {
  const newEvent = await translateEvent(eventData);
  const googleRes = await postGoogleEvent(accessToken, calendarId, newEvent);

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

  return googleFromRes as GoogleCalendarEvent;
};
