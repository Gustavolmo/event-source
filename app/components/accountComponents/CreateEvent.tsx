'use client';
import { createNewEvent } from '@/app-library/DbControls';
import { EventData } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

export default function CreateEvent() {
  const { data: session } = useSession();
  const sessionName = session?.user?.name;
  const sessionEmail = session?.user?.email;
  const [invitedEmails, setEmailList] = useState<string[]>([]);
  const date = String(new Date().toDateString());
  const [eventData, setEventData] = useState<EventData>({
    eventTitle: '',
    dateCreated: date,
    organizerId: '',
    organizerName: '',
    invited: [],
    eventCheck: true,
    transportCheck: false,
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    eventDuration: '',
    eventDescription: '',
    eventRSVP: '',
    eventCost: 0,
    acceptedLive: [],
    acceptedVirtually: [],
    rejected: [],
    virtualLink: '',
    transportMode: '',
    transportCost: 0,
    transportDescription: '',
    travelTime: '',
    pickupLocation: '',
    pickupTime: '',
    returnTime: '',
    seatsAvailable: 0,
    passengers: [],
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setEventData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    eventData.invited = invitedEmails;
    eventData.organizerName = String(sessionName);
    createNewEvent(sessionEmail, eventData);

    setEventData({
      eventTitle: '',
      dateCreated: date,
      organizerId: '',
      organizerName: '',
      invited: [],
      eventCheck: false,
      transportCheck: false,
      eventDate: '',
      eventTime: '',
      eventLocation: '',
      eventDuration: '',
      eventDescription: '',
      eventRSVP: '',
      eventCost: 0,
      acceptedLive: [],
      acceptedVirtually: [],
      rejected: [],
      virtualLink: '',
      transportMode: '',
      transportCost: 0,
      transportDescription: '',
      travelTime: '',
      pickupLocation: '',
      pickupTime: '',
      returnTime: '',
      seatsAvailable: 0,
      passengers: [],
    });
    setEmailList([]);
  };

  return (
    <>
      <form className="create-event-form" onSubmit={handleFormSubmit}>
        <label>I am offering:</label>
        <span>
          <input
            type="checkbox"
            name="eventCheck"
            checked={eventData.eventCheck}
            onChange={handleOnCheckBox}
          />
          An Event
        </span>
        <span>
          <input
            type="checkbox"
            name="transportCheck"
            checked={eventData.transportCheck}
            onChange={handleOnCheckBox}
          />
          Transportation
        </span>

        {eventData.eventCheck && (
          <input
            type="text"
            name="eventTitle"
            placeholder="Event Title"
            onChange={handleOnChange}
            value={eventData.eventTitle}
          />
        )}

        {eventData.eventCheck && (
          <input
            type="text"
            name="eventLocation"
            placeholder="Event Venue"
            onChange={handleOnChange}
            value={eventData.eventLocation}
          />
        )}

        {eventData.eventCheck && (
          <input
            type="text"
            name="eventCost"
            placeholder="Cost per person"
            onChange={handleOnChange}
            value={eventData.eventCost}
          />
        )}

        {eventData.eventCheck && (
          <input
            type="text"
            name="eventRSVP"
            placeholder="RSVP"
            onChange={handleOnChange}
            value={eventData.eventRSVP}
          />
        )}
        {eventData.eventCheck && (
          <input
            type="text"
            name="virtualLink"
            placeholder="Virtual Attendance Link"
            onChange={handleOnChange}
            value={eventData.virtualLink}
          />
        )}
        {eventData.eventCheck && (
          <input
            type="text"
            name="eventDate"
            placeholder="Event date"
            onChange={handleOnChange}
            value={eventData.eventDate}
          />
        )}
        {eventData.eventCheck && (
          <input
            type="text"
            name="eventTime"
            placeholder="Event time"
            onChange={handleOnChange}
            value={eventData.eventTime}
          />
        )}
        {eventData.eventCheck && (
          <input
            type="text"
            name="eventDuration"
            placeholder="Event duration"
            onChange={handleOnChange}
            value={eventData.eventDuration}
          />
        )}
        {eventData.eventCheck && (
          <textarea
            name="eventDescription"
            cols={30}
            rows={10}
            placeholder="Description"
            onChange={handleOnChange}
            value={eventData.eventDescription}
          ></textarea>
        )}

        {(eventData.eventCheck || eventData.transportCheck) && (
          <>
            <TagsInput
              name="invited"
              value={invitedEmails}
              onChange={setEmailList}
              placeHolder="guest's email"
            />
            <pre>{invitedEmails.toString()}</pre>
          </>
        )}

        {eventData.transportCheck && (
          <input
            type="text"
            name="transportMode"
            placeholder="Transport mode"
            onChange={handleOnChange}
            value={eventData.transportMode}
          />
        )}

        {eventData.transportCheck && (
          <input
            type="text"
            name="transportCost"
            placeholder="Cost per person"
            onChange={handleOnChange}
            value={eventData.transportCost}
          />
        )}
        {eventData.transportCheck && (
          <input
            type="text"
            name="pickupLocation"
            placeholder="Pickup location"
            onChange={handleOnChange}
            value={eventData.pickupLocation}
          />
        )}
        {eventData.transportCheck && (
          <input
            type="text"
            name="pickupTime"
            placeholder="Pickup time"
            onChange={handleOnChange}
            value={eventData.pickupTime}
          />
        )}
        {eventData.transportCheck && (
          <input
            type="text"
            name="returnTime"
            placeholder="Return time"
            onChange={handleOnChange}
            value={eventData.returnTime}
          />
        )}
        {eventData.transportCheck && (
          <input
            type="text"
            name="travelTime"
            placeholder="Travel time"
            onChange={handleOnChange}
            value={eventData.travelTime}
          />
        )}
        {eventData.transportCheck && (
          <input
            type="text"
            name="seatsAvailable"
            placeholder="Seats Available"
            onChange={handleOnChange}
            value={eventData.seatsAvailable}
          />
        )}
        {eventData.transportCheck && (
          <textarea
            name="transportDescription"
            cols={30}
            rows={10}
            placeholder="Descritpion"
            onChange={handleOnChange}
            value={eventData.transportDescription}
          ></textarea>
        )}

        {(eventData.eventCheck || eventData.transportCheck) && (
          <button className="page-button" type="submit">
            Create Event!
          </button>
        )}
      </form>
    </>
  );
}
