import { ObjectId } from "mongodb";

export type User = {
  _id?: ObjectId;
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
  hasInfo: boolean;
  dietaryRestrictions?: string
  accessibilityNeeds?: string
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
  eventDuration: string;
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
  seatsAvailable: number;
  passengers: string[];
};