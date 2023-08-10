'use client';
import { createNewEvent } from '@/app-library/DbControls';
import { EventData } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

export default function CreateEvent() {
  const date = String(new Date().toDateString());
  const { data: session } = useSession();
  const sessionEmail = session?.user?.email;
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const defaultFormValues: EventData = {
    eventTitle: '',
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
    returnDate: '',
    seatsAvailable: 0,
    passengers: [],
  };
  const [eventData, setEventData] = useState<EventData>(defaultFormValues);

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
    eventData.organizerName = String(session?.user?.name);
    createNewEvent(sessionEmail, eventData);

    setEventData(defaultFormValues);
    setInvitedEmails([]);
  };

  return (
    <section className='event-card'>
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

        {(eventData.eventCheck || eventData.transportCheck) && (
          <input
            type="text"
            name="eventTitle"
            placeholder="Event Title"
            onChange={handleOnChange}
            value={eventData.eventTitle}
            required
          />
        )}

        {eventData.eventCheck && (
          <input
            type="text"
            name="eventLocation"
            placeholder="Event Venue"
            onChange={handleOnChange}
            value={eventData.eventLocation}
            required
          />
        )}

        {eventData.eventCheck && (
          <section>
            <label>Cost per person (SEK)</label>
            <input
              type="number"
              name="eventCost"
              placeholder="Cost per person"
              onChange={handleOnChange}
              value={eventData.eventCost}
              required
            />
          </section>
        )}

        {eventData.eventCheck && (
          <section>
            <label>RSVP</label>
            <input
              type="date"
              name="eventRSVP"
              placeholder="RSVP"
              onChange={handleOnChange}
              value={eventData.eventRSVP}
              required
            />
          </section>
        )}
        {eventData.eventCheck && (
          <input
            type="text"
            name="virtualLink"
            placeholder="Virtual Attendance Link"
            onChange={handleOnChange}
            value={eventData.virtualLink}
            required
          />
        )}
        {(eventData.eventCheck || eventData.transportCheck) && (
          <section>
            <label>Event Date</label>
            <input
              type="date"
              name="eventDate"
              placeholder="Event date"
              onChange={handleOnChange}
              value={eventData.eventDate}
              required
            />
          </section>
        )}
        {eventData.eventCheck && (
          <section>
            <label>Starting Time</label>
            <input
              type="time"
              name="eventTime"
              placeholder="Event time"
              onChange={handleOnChange}
              value={eventData.eventTime}
              required
            />
          </section>
        )}
        {eventData.eventCheck && (
          <>
            <div>
              <label>Ends in a different date?</label>
              <input
                type="checkbox"
                name="multiDayCheck"
                checked={eventData.multiDayCheck}
                onChange={handleOnCheckBox}
              />
            </div>
            {eventData.multiDayCheck && (
              <section>
                <label>Event End Date</label>
                <input
                  type="date"
                  name="eventEndDate"
                  onChange={handleOnChange}
                  value={eventData.eventEndDate}
                  required
                />
              </section>
            )}
          </>
        )}
        {eventData.eventCheck && (
          <section>
            <label>Event Ending Time</label>
            <input
              type="time"
              name="eventEndTime"
              placeholder="Event End"
              onChange={handleOnChange}
              value={eventData.eventEndTime}
              required
            />
          </section>
        )}
        {eventData.eventCheck && (
          <textarea
            name="eventDescription"
            cols={30}
            rows={10}
            placeholder="Description"
            onChange={handleOnChange}
            value={eventData.eventDescription}
            required
          ></textarea>
        )}

        {(eventData.eventCheck || eventData.transportCheck) && (
          <>
            <TagsInput
              name="invited"
              value={invitedEmails}
              onChange={setInvitedEmails}
              placeHolder="guests email"
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
            required
          />
        )}

        {eventData.transportCheck && (
          <section>
            <label>Cost per passenger (SEK)</label>
            <input
              type="number"
              name="transportCost"
              placeholder="Cost per person"
              onChange={handleOnChange}
              value={eventData.transportCost}
              required
            />
          </section>
        )}
        {eventData.transportCheck && (
          <input
            type="text"
            name="pickupLocation"
            placeholder="Pickup location"
            onChange={handleOnChange}
            value={eventData.pickupLocation}
            required
          />
        )}
        {eventData.transportCheck && (
          <section>
            <label>Pickup Time</label>
            <input
              type="time"
              name="pickupTime"
              placeholder="Pickup time"
              onChange={handleOnChange}
              value={eventData.pickupTime}
              required
            />
          </section>
        )}
        {eventData.transportCheck && (
          <>
            <div>
              <label>Round Trip?</label>
              <input
                type="checkbox"
                name="roundTripCheck"
                checked={eventData.roundTripCheck}
                onChange={handleOnCheckBox}
              />
            </div>
            {eventData.roundTripCheck && (
              <section>
                <label>Return time/date </label>
                <input
                  type="time"
                  name="returnTime"
                  placeholder="Return time"
                  onChange={handleOnChange}
                  value={eventData.returnTime}
                  required
                />
                <input
                  type="date"
                  name="returnDate"
                  placeholder="Return date"
                  onChange={handleOnChange}
                  value={eventData.returnDate}
                />
              </section>
            )}
          </>
        )}
        {eventData.transportCheck && (
          <section>
            <label>Travel Time</label>
            <input
              type="text"
              name="travelTime"
              placeholder="Travel time"
              onChange={handleOnChange}
              value={eventData.travelTime}
              required
            />
          </section>
        )}
        {eventData.transportCheck && (
          <section>
            <label>Seats Available</label>
            <input
              type="number"
              name="seatsAvailable"
              placeholder="Seats Available"
              onChange={handleOnChange}
              value={eventData.seatsAvailable}
              required
            />
          </section>
        )}
        {eventData.transportCheck && (
          <textarea
            name="transportDescription"
            cols={30}
            rows={10}
            placeholder="Descritpion"
            onChange={handleOnChange}
            value={eventData.transportDescription}
            required
          ></textarea>
        )}

        {(eventData.eventCheck || eventData.transportCheck) && (
          <button className="navbar__button" type="submit">
            Create Event!
          </button>
        )}
      </form>
    </section>
  );
}
