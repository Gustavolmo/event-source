'use server';
import { EventData } from "@/app-types/types";


// TESTING MODE
export const createGoogleEvent = async (accessToken: string, calendarId: string, eventData: EventData) => {
  
  const newEvent = {
    summary: eventData.eventTitle,
    location: eventData.eventLocation,
    description: `Event: ${eventData.eventDescription} Transit: ${eventData.transportDescription}`,
    start: {
      dateTime: `${eventData.eventDate}T${eventData.eventTime}:00` ,// YYYY-MM-DDTHH:MM:SS.sssZ
      timeZone: 'CET',   // Replace with form values
    },
    end: {
      dateTime: `${eventData.eventEndDate}T${eventData.eventEndTime}:00`, // YYYY-MM-DDTHH:MM:SS.sssZ
      timeZone: 'CET',   // Replace with form values
    },
  };
  
  const googleRes = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEvent),
  });

  if (googleRes.ok) {
    console.log('Event created successfully');
    const newEventData = await googleRes.json()
    return newEventData.id

  } else {
    console.error('Failed to create event:', googleRes);
    return false
  }
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// ======================
// COMPLETE EVENT OBJECT
// ======================

// {
//   "kind": "calendar#event",
//   "etag": etag,
//   "id": string,
//   "status": string,
//   "htmlLink": string,
//   "created": datetime,  YYYY-MM-DDTHH:MM:SS.sssZ
//   "updated": datetime,  YYYY-MM-DDTHH:MM:SS.sssZ
//   "summary": string,
//   "description": string,
//   "location": string,
//   "colorId": string,
//   "creator": {
//     "id": string,
//     "email": string,
//     "displayName": string,
//     "self": boolean
//   },
//   "organizer": {
//     "id": string,
//     "email": string,
//     "displayName": string,
//     "self": boolean
//   },
//   "start": {
//     "date": date,
//     "dateTime": datetime,  YYYY-MM-DDTHH:MM:SS.sssZ
//     "timeZone": string
//   },
//   "end": {
//     "date": date,
//     "dateTime": datetime,  YYYY-MM-DDTHH:MM:SS.sssZ
//     "timeZone": string
//   },
//   "endTimeUnspecified": boolean,
//   "recurrence": [
//     string
//   ],
//   "recurringEventId": string,
//   "originalStartTime": {
//     "date": date,
//     "dateTime": datetime,  YYYY-MM-DDTHH:MM:SS.sssZ
//     "timeZone": string
//   },
//   "transparency": string,
//   "visibility": string,
//   "iCalUID": string,
//   "sequence": integer,
//   "attendees": [
//     {
//       "id": string,
//       "email": string,
//       "displayName": string,
//       "organizer": boolean,
//       "self": boolean,
//       "resource": boolean,
//       "optional": boolean,
//       "responseStatus": string,
//       "comment": string,
//       "additionalGuests": integer
//     }
//   ],
//   "attendeesOmitted": boolean,
//   "extendedProperties": {
//     "private": {
//       (key): string
//     },
//     "shared": {
//       (key): string
//     }
//   },
//   "hangoutLink": string,
//   "conferenceData": {
//     "createRequest": {
//       "requestId": string,
//       "conferenceSolutionKey": {
//         "type": string
//       },
//       "status": {
//         "statusCode": string
//       }
//     },
//     "entryPoints": [
//       {
//         "entryPointType": string,
//         "uri": string,
//         "label": string,
//         "pin": string,
//         "accessCode": string,
//         "meetingCode": string,
//         "passcode": string,
//         "password": string
//       }
//     ],
//     "conferenceSolution": {
//       "key": {
//         "type": string
//       },
//       "name": string,
//       "iconUri": string
//     },
//     "conferenceId": string,
//     "signature": string,
//     "notes": string,
//   },
//   "gadget": {
//     "type": string,
//     "title": string,
//     "link": string,
//     "iconLink": string,
//     "width": integer,
//     "height": integer,
//     "display": string,
//     "preferences": {
//       (key): string
//     }
//   },
//   "anyoneCanAddSelf": boolean,
//   "guestsCanInviteOthers": boolean,
//   "guestsCanModify": boolean,
//   "guestsCanSeeOtherGuests": boolean,
//   "privateCopy": boolean,
//   "locked": boolean,
//   "reminders": {
//     "useDefault": boolean,
//     "overrides": [
//       {
//         "method": string,
//         "minutes": integer
//       }
//     ]
//   },
//   "source": {
//     "url": string,
//     "title": string
//   },
//   "workingLocationProperties": {
//     "type": string,
//     "homeOffice": (value),
//     "customLocation": {
//       "label": string
//     },
//     "officeLocation": {
//       "buildingId": string,
//       "floorId": string,
//       "floorSectionId": string,
//       "deskId": string,
//       "label": string
//     }
//   },
//   "attachments": [
//     {
//       "fileUrl": string,
//       "title": string,
//       "mimeType": string,
//       "iconLink": string,
//       "fileId": string
//     }
//   ],
//   "eventType": string
// }