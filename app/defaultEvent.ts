import { EventData } from '@/app-types/types';

const date = String(new Date().toDateString());

// const formDefaultDate = () => {
//   const currentDate = new Date();
//   const year = currentDate.getFullYear();
//   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
//   const day = currentDate.getDate().toString().padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// const formDefaultTime = () => {
//   const currentTime = new Date();
//   const hours = currentTime.getHours().toString().padStart(2, '0');
//   const minutes = currentTime.getMinutes().toString().padStart(2, '0');
//   return `${hours}:${minutes}`;
// }

export const defaultFormValues: EventData = {
  eventTitle: '',

  googleEventId: '',
  googleTransitInboundId: '',
  googleTransitFromId: '',
  timeZone: '',

  dateCreated: date,
  organizerId: '',
  organizerName: '',
  invited: [],
  eventCheck: true,
  transportCheck: false,
  roundTripCheck: false,
  multiDayCheck: false,
  eventDate: '',
  eventTime: '',
  eventLocation: '',
  eventEndDate: '',
  eventEndTime: '',
  eventDescription: '',

  rsvpCheck: false,
  googleLinkCheck: false,

  eventRSVP:'',
  eventCost: 0,
  acceptedLive: [],
  acceptedVirtually: [],
  rejected: [],
  transportMode: '',
  transportCost: 0,
  transportDescription: '',
  travelTime: 0,
  pickupLocation: '',
  pickupTime: '',
  pickupDate: '',
  dropOffLocation: '',
  returnTime: '',
  returnDate: '',
  seatsAvailable: 0,
  passengers: [],
};
