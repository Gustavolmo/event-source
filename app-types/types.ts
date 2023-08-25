import { ObjectId } from 'mongodb';

export type User = {
  _id?: ObjectId;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
  dietaryRestrictions?: string;
  accessibilityNeeds?: string;
  additionalRemarks?: string;
};

export type UserPreferences = {
  name: string | null | undefined;
  dietaryRestrictions: string | null | undefined;
  accessibilityNeeds: string | null | undefined;
  additionalRemarks?: string | null | undefined;
};

export interface DbData extends User, EventData {}

export type EventData = {
  _id?: ObjectId;

  googleEventId: string | boolean,
  googleTransitInboundId: string | boolean
  googleTransitFromId: string | boolean
  googleCalendarLink: string
  googleCalendarTripLink: string

  timeZone?: string; // ADD TO FORM

  eventTitle: string;
  dateCreated: string;
  organizerId: string;
  organizerName: string;
  invited: string[];
  eventCheck: boolean;
  transportCheck: boolean;
  roundTripCheck: boolean;
  multiDayCheck: boolean;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventEndDate: string;
  eventEndTime: string;
  eventDescription: string;
  rsvpCheck: boolean;
  googleLinkCheck: boolean;
  eventRSVP: string;
  eventCost: number;
  acceptedLive: string[];
  maybeAccepted: string[];
  rejected: string[];
  transportMode: string;
  transportCost: number;
  transportDescription: string;
  travelTime: number;
  pickupLocation: string;
  pickupTime: string;
  pickupDate: string;
  dropOffLocation: string;
  returnTime: string;
  returnDate: string;
  seatsAvailable: number;
  passengersInbound: string[];
  passengersOutbound: string[];
};

// Google Response
// {
//   kind: 'calendar#event',
//   etag: '"3385945822140000"',
//   id: '2kp2fpq2h4gjpn29mf0m9l54rs',
//   status: 'confirmed',
//   htmlLink: 'https://www.google.com/calendar/event?eid=MmtwMmZwcTJoNGdqcG4yOW1mMG05bDU0cnMgbG1vLmd1c3Rhdm9AbQ',
//   created: '2023-08-25T14:13:34.000Z',
//   updated: '2023-08-25T14:15:11.070Z',
//   summary: 'test',
//   description: '<br><b>Event Fee:</b> 0kr\n' +
//     '<br><b>ABOUT: </b>test\n' +
//     '<br><br><b>DIET RESTRICTIONS & MORE?</b><br><b>event-sauce.vercel.app/account</b>',
//   location: 'Essinge Brogata 16, Stockholm',
//   creator: { email: 'lmo.gustavo@gmail.com', self: true },
//   organizer: { email: 'lmo.gustavo@gmail.com', self: true },
//   start: { dateTime: '2023-08-26T16:00:00+02:00', timeZone: 'CET' },
//   end: { dateTime: '2023-08-26T17:00:00+02:00', timeZone: 'CET' },
//   iCalUID: '2kp2fpq2h4gjpn29mf0m9l54rs@google.com',
//   sequence: 0,
//   attendees: [
//     {
//       email: 'lmo.gustavo@gmail.com',
//       organizer: true,
//       self: true,
//       responseStatus: 'tentative' OR 'declined' OR 'accepted' OR 'needsAction'
//     }
//   ],
//   reminders: { useDefault: true },
//   eventType: 'default'
// }
