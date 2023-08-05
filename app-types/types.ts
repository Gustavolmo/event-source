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
  dietaryRestrictions: string;
  accessibilityNeeds: string;
  additionalRemarks?: string;
};

export type EventData = {
  _id?: ObjectId;
  eventTitle: string;
  dateCreated: string;
  organizerId: string;
  organizerName: string;
  invited: string[];
  eventCheck: boolean;
  transportCheck: boolean;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventEndTime: string;
  eventDescription: string;
  eventRSVP: string;
  eventCost: number;
  acceptedLive: string[];
  acceptedVirtually: string[];
  rejected: string[];
  virtualLink: string;
  transportMode: string;
  transportCost: number;
  transportDescription: string;
  travelTime: string;
  pickupLocation: string;
  pickupTime: string;
  returnTime: string;
  returnDate: string ,
  seatsAvailable: number;
  passengers: string[];
};
