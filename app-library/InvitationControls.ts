'use server';
import { EventData, User } from '@/app-types/types';
import { client, runMongoDb } from './mongoConnect';
import { ObjectId } from 'mongodb';
import { GoogleCalendarEvent, GoogleEventResponse } from './GoogleCalendarType';

runMongoDb();
const databaseName = 'eventsource';
const collectionEvent = 'event';
const eventCollection = client.db(databaseName).collection(collectionEvent);

// DISABLE EVENT CHECK
export const disableEventCheck = async (event: EventData) => {
  try {
    await eventCollection.updateOne(
      { googleTransitInboundId: event.googleTransitInboundId },
      { $set: {eventCheck: false} }
    );
  } catch (e) {
    console.error(e);
  }
};

// DISABLE TRANSPORT CHECK
export const disableTransportCheck = async (event: EventData) => {
  try {
    await eventCollection.updateOne(
      { _id: new ObjectId(event._id) },
      { $set: {transportCheck: false} }
    );
  } catch (e) {
    console.error(e);
  }
};
// DISABLE RETURN TRIP CHECK
export const disableRoundTripCheck = async (event: EventData) => {
  try {
    await eventCollection.updateOne(
      { _id: new ObjectId(event._id) },
      { $set: {roundTripCheck: false} }
    );
  } catch (e) {
    console.error(e);
  }
};

// SYNC INBOUND FROM GOOGLE syncInboundFromGoogle
export const syncInboundFromGoogle = async (
  calendarData: GoogleCalendarEvent,
  event: EventData
) => {
  try {
    if (event.transportCheck) {
      const startDate = calendarData.start?.dateTime?.slice(0, 10);
      const startTime = calendarData.start?.dateTime?.slice(11, 16);

      await eventCollection.updateOne(
        { _id: new ObjectId(event._id) },
        {
          $set: {
            pickupLocation: calendarData.location,
            pickupDate: startDate,
            pickupTime: startTime,
          },
        }
      );
    }
  } catch (e) {
    console.error(e);
  }
};

// SYNC OUTBOUND FROM GOOGLE syncOutboundFromGoogle
export const syncOutboundFromGoogle = async (
  calendarData: GoogleCalendarEvent,
  event: EventData
) => {
  try {
    if (event.transportCheck && event.roundTripCheck) {
      const returnDate = calendarData.start?.dateTime?.slice(0, 10);
      const returnTime = calendarData.start?.dateTime?.slice(11, 16);

      await eventCollection.updateOne(
        { googleTransitFromId: event.googleTransitFromId },
        {
          $set: {
            dropOffLocation: calendarData.location,
            returnDate: returnDate,
            returnTime: returnTime,
          },
        }
      );
    }
  } catch (e) {
    console.error(e);
  }
};

// SYNC EVENT FROM GOOGLE
export const syncEventFromGoogle = async (
  calendarData: GoogleEventResponse,
  event: EventData
) => {
  try {
    if (event.eventCheck) {
      const startDate = calendarData.start?.dateTime?.slice(0, 10);
      const endDate = calendarData.end?.dateTime?.slice(0, 10);
      const startTime = calendarData.start?.dateTime?.slice(11, 16);
      const endTime = calendarData.end?.dateTime?.slice(11, 16);

      await eventCollection.updateOne(
        { _id: new ObjectId(event._id) },
        {
          $set: {
            eventTitle: calendarData.summary,
            eventLocation: calendarData.location,
            eventDate: startDate,
            eventTime: startTime,
            eventEndDate: endDate,
            eventEndTime: endTime,
            timeZone: calendarData.start?.timeZone,
            invited: calendarData.attendees?.map((guest) => guest.email),
          },
        }
      );
    }
  } catch (e) {
    console.error(e);
  }
};

// UPDATE AN INVITATION
export const updateEventInDb = async (
  eventId: EventData['_id'],
  event: EventData
) => {
  try {
    await eventCollection.updateOne(
      { _id: new ObjectId(eventId) },
      {
        $set: {
          eventTitle: event.eventTitle,
          dateCreated: event.dateCreated,
          organizerId: event.organizerId,
          organizerName: event.organizerName,

          timeZone: event.timeZone, // REMEMBER THIS IS NEW

          invited: event.invited,
          eventCheck: event.eventCheck,
          transportCheck: event.transportCheck,
          roundTripCheck: event.roundTripCheck,
          multiDayCheck: event.multiDayCheck,
          eventDate: event.eventDate,
          eventTime: event.eventTime,
          eventLocation: event.eventLocation,
          eventEndDate: event.eventEndDate,
          eventEndTime: event.eventEndTime,
          eventDescription: event.eventDescription,
          eventRSVP: event.eventRSVP,
          eventCost: event.eventCost,
          acceptedLive: event.acceptedLive,
          maybeAccepted: event.maybeAccepted,
          rejected: event.rejected,
          googleLinkCheck: event.googleLinkCheck,
          rsvpCheck: event.rsvpCheck,
          transportMode: event.transportMode,
          transportCost: event.transportCost,
          transportDescription: event.transportDescription,
          travelTime: event.travelTime,
          pickupLocation: event.pickupLocation,
          pickupTime: event.pickupTime,
          pickupDate: event.pickupDate,
          dropOffLocation: event.dropOffLocation,
          returnTime: event.returnTime,
          returnDate: event.returnDate,
          seatsAvailable: event.seatsAvailable,
          passengersInbound: event.passengersInbound,
          passengersOutbound: event.passengersOutbound,
        },
      }
    );
  } catch (e) {
    console.error(e);
  }
};

// REMOVE GUEST FROM A LIST
export const removeGuestFromList = async (
  userEmail: User['email'],
  eventId: EventData['_id'],
  listName: string
) => {
  try {
    await eventCollection.updateOne(
      { _id: new ObjectId(eventId) },
      { $pull: { [listName]: userEmail } }
    );
  } catch (e) {
    console.error(e);
  }
};

// ADD GUEST TO LIST CONTROL
export const addGuestToListController = async (
  userEmail: User['email'],
  eventId: EventData['_id'],
  listName: string
) => {
  try {
    const event = await eventCollection.findOne({ _id: new ObjectId(eventId) });

    switch (listName) {
      case 'invited':
        if (event && !event.invited.includes(userEmail)) {
          await eventCollection.updateOne(
            { _id: new ObjectId(eventId) },
            { $push: { [listName]: userEmail } }
          );
        }
        break;

      case 'acceptedLive':
        if (event && !event.acceptedLive.includes(userEmail)) {
          await removeGuestFromList(userEmail, eventId, 'maybeAccepted');
          await removeGuestFromList(userEmail, eventId, 'rejected');
          await eventCollection.updateOne(
            { _id: new ObjectId(eventId) },
            { $push: { [listName]: userEmail } }
          );
        }
        break;

      case 'maybeAccepted':
        if (event && !event.maybeAccepted.includes(userEmail)) {
          await removeGuestFromList(userEmail, eventId, 'acceptedLive');
          await removeGuestFromList(userEmail, eventId, 'rejected');
          await eventCollection.updateOne(
            { _id: new ObjectId(eventId) },
            { $push: { [listName]: userEmail } }
          );
        }
        break;

      case 'rejected':
        if (event && !event.rejected.includes(userEmail)) {
          await removeGuestFromList(userEmail, eventId, 'acceptedLive');
          await removeGuestFromList(userEmail, eventId, 'maybeAccepted');
          await eventCollection.updateOne(
            { _id: new ObjectId(eventId) },
            { $push: { [listName]: userEmail } }
          );
        }
        break;

      case 'passengersInbound':
        if (event && !event.passengersInbound.includes(userEmail)) {
          await eventCollection.updateOne(
            { _id: new ObjectId(eventId) },
            { $push: { [listName]: userEmail } }
          );
        }
        break;

      case 'passengersOutbound':
        if (event && !event.passengersOutbound.includes(userEmail)) {
          await eventCollection.updateOne(
            { _id: new ObjectId(eventId) },
            { $push: { [listName]: userEmail } }
          );
        }
        break;

      default:
        console.warn(
          'listName parameter in addGuestToListController has no match'
        );
    }
  } catch (e) {
    console.error(e);
  }
};
