'use client';
import { createNewEvent } from '@/app-library/private';
import { EventData } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

export default function CreateEvent() {
  const { data: session } = useSession();
  const formManager = session?.user?.name
  const [invitedEmails, setEmailList] = useState<string[]>([]);
  const date = String(new Date().toDateString());
  const [eventData, setEventData] = useState<EventData>({
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

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  };

  const handleOnCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setEventData(prevState => ({ ...prevState, [e.target.name]: e.target.checked }))
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    eventData.invited = invitedEmails
    eventData.organizerName = String(formManager)
    createNewEvent(formManager, eventData);

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

        <input
          type="text"
          name="eventTitle"
          placeholder="Event Title"
          onChange={handleOnChange}
          value={eventData.eventTitle}
        />
        <input
          type="text"
          name="eventLocation"
          placeholder="Event Venue"
          onChange={handleOnChange}
          value={eventData.eventLocation}
        />
        <input
          type="text"
          name="eventCost"
          placeholder="Cost per person"
          onChange={handleOnChange}
          value={eventData.eventCost}
        />
        <input
          type="text"
          name="eventRSVP"
          placeholder="RSVP"
          onChange={handleOnChange}
          value={eventData.eventRSVP}
        />
        <input
          type="text"
          name="virtualLink"
          placeholder="Virtual Attendance Link"
          onChange={handleOnChange}
          value={eventData.virtualLink}
        />
        <input
          type="text"
          name="eventDate"
          placeholder="Event date"
          onChange={handleOnChange}
          value={eventData.eventDate}
        />
        <input
          type="text"
          name="eventTime"
          placeholder="Event time"
          onChange={handleOnChange}
          value={eventData.eventTime}
        />
        <input
          type="text"
          name="eventDuration"
          placeholder="Event duration"
          onChange={handleOnChange}
          value={eventData.eventDuration}
        />

        <textarea
          name="eventDescription"
          cols={30}
          rows={10}
          placeholder="Description"
          onChange={handleOnChange}
          value={eventData.eventDescription}
        ></textarea>

        <TagsInput
          name="invited"
          value={invitedEmails}
          onChange={setEmailList}
          placeHolder="guest's email"
        />
        <pre>{JSON.stringify(invitedEmails)}</pre>

        <input
          type="text"
          name="transportMode"
          placeholder="Transport mode"
          onChange={handleOnChange}
          value={eventData.transportMode}
        />
        <input
          type="text"
          name="transportCost"
          placeholder="Cost per person"
          onChange={handleOnChange}
          value={eventData.transportCost}
        />
        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup location"
          onChange={handleOnChange}
          value={eventData.pickupLocation}
        />
        <input
          type="text"
          name="pickupTime"
          placeholder="Pickup time"
          onChange={handleOnChange}
          value={eventData.pickupTime}
        />
        <input
          type="text"
          name="returnTime"
          placeholder="Return time"
          onChange={handleOnChange}
          value={eventData.returnTime}
        />
        <input
          type="text"
          name="travelTime"
          placeholder="Travel time"
          onChange={handleOnChange}
          value={eventData.travelTime}
        />
        <input
          type="text"
          name="seatsAvailable"
          placeholder="Seats Available"
          onChange={handleOnChange}
          value={eventData.seatsAvailable}
        />
        <textarea
          name="transportDescription"
          cols={30}
          rows={10}
          placeholder="Descritpion"
          onChange={handleOnChange}
          value={eventData.transportDescription}
        ></textarea>

        <button className="navbar__button" type="submit">
          Create Event!
        </button>
      </form>
    </>
  );
}
