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

  googleEventId?: string | boolean,
  googleTransitInboundId?: string | boolean
  googleTransitFromId?: string | boolean
  googleCalendarLink?: string
  googleCalendarTripLink?: string
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
  passengers: string[];
};
