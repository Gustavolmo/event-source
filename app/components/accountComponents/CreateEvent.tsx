'use client';
import { createNewEvent } from '@/app-library/DbControls';
import { EventData } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import EasterEgg from '../EasterEgg';

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
    virtualLink: false,
    transportMode: '',
    transportCost: 0,
    transportDescription: '',
    travelTime: '',
    pickupLocation: '',
    pickupTime: '',
    pickupDate: '',
    dropOffLocation: '',
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
    <>
      <h2>CREATE</h2>
      <section className="event-card">
        <form className="create-event-form" onSubmit={handleFormSubmit}>
          <section className="form__offerings">
            <div className="form__offerings">
              <input
                type="checkbox"
                name="eventCheck"
                checked={eventData.eventCheck}
                onChange={handleOnCheckBox}
              />
              <b>An Event</b>
            </div>

            <div className="form__offerings">
              <input
                type="checkbox"
                name="transportCheck"
                checked={eventData.transportCheck}
                onChange={handleOnCheckBox}
              />
              <b>Transportation</b>
            </div>
          </section>
          {eventData.eventCheck && <b className="form__section-title">EVENT</b>}
          {!eventData.eventCheck && eventData.transportCheck && (
            <b className="form__section-title">TRANSPORT</b>
          )}
          {(eventData.eventCheck || eventData.transportCheck) && (
            <input
              className="--with-margin-n-8px"
              type="text"
              name="eventTitle"
              placeholder="Title"
              onChange={handleOnChange}
              value={eventData.eventTitle}
              required
            />
          )}

          {eventData.eventCheck && (
            <input
              className="--with-margin-n-8px"
              type="text"
              name="eventLocation"
              placeholder="Event Venue"
              onChange={handleOnChange}
              value={eventData.eventLocation}
              required
            />
          )}
          {eventData.eventCheck && (
            <section className="form__offerings">
              <div className="form__offerings">
                <input
                  type="checkbox"
                  name="virtualLink"
                  placeholder="Google Meets Link (opt)"
                  checked={eventData.virtualLink}
                  onChange={handleOnCheckBox}
                />
                <b className="--bold-gray">Add Google meet link?</b>
              </div>
            </section>
          )}

          {(eventData.eventCheck || eventData.transportCheck) && (
            <div className='--padding-right8px'>
              <TagsInput
                name="invited"
                value={invitedEmails}
                onChange={setInvitedEmails}
                placeHolder="guests email"
              />
            </div>
          )}

          {eventData.eventCheck && (
            <textarea
              className="--with-margin-n-8px"
              name="eventDescription"
              cols={30}
              rows={5}
              placeholder="Short description"
              onChange={handleOnChange}
              value={eventData.eventDescription}
              required
            ></textarea>
          )}

          {eventData.eventCheck && (
            <section>
              <input
                className="form__input-120w"
                type="number"
                name="eventCost"
                placeholder="Cost per person"
                onChange={handleOnChange}
                value={eventData.eventCost}
                required
              />
              <b className="--bold-gray">Cost per person (SEK)</b>
            </section>
          )}

          {eventData.eventCheck && (
            <section>
              <input
                className="form__input-120w"
                type="date"
                name="eventRSVP"
                placeholder="RSVP"
                onChange={handleOnChange}
                value={eventData.eventRSVP}
                required
              />
              <b className="--bold-gray">RSVP</b>
            </section>
          )}
          {eventData.eventCheck && (
            <section>
              <input
                className="form__input-120w"
                type="date"
                name="eventDate"
                placeholder="Event date"
                onChange={handleOnChange}
                value={eventData.eventDate}
                required
              />
              <b className="--bold-gray">Event Date</b>
            </section>
          )}
          {eventData.eventCheck && (
            <section>
              <input
                className="form__input-120w"
                type="time"
                name="eventTime"
                placeholder="Event time"
                onChange={handleOnChange}
                value={eventData.eventTime}
                required
              />
              <b className="--bold-gray">Starting Time</b>
            </section>
          )}

          {eventData.eventCheck && (
            <section>
              <input
                className="form__input-120w"
                type="time"
                name="eventEndTime"
                placeholder="Event End"
                onChange={handleOnChange}
                value={eventData.eventEndTime}
                required
              />
              <b className="--bold-gray">Ending Time</b>
            </section>
          )}

          {eventData.eventCheck && (
            <>
              <div className="form__offerings-alone">
                <input
                  type="checkbox"
                  name="multiDayCheck"
                  checked={eventData.multiDayCheck}
                  onChange={handleOnCheckBox}
                />
                <b className="--bold-gray">Ends in a different date?</b>
                {eventData.multiDayCheck && (
                  <section>
                    <input
                      type="date"
                      name="eventEndDate"
                      onChange={handleOnChange}
                      value={eventData.eventEndDate}
                      required
                    />
                  </section>
                )}
              </div>
            </>
          )}

          {eventData.transportCheck && eventData.eventCheck && (
            <b className="form__section-title">TRANSPORT</b>
          )}

          {eventData.transportCheck && (
            <input
              className="--with-margin-n-8px"
              type="text"
              name="transportMode"
              placeholder="Vehicle details"
              onChange={handleOnChange}
              value={eventData.transportMode}
              required
            />
          )}

          {eventData.transportCheck && (
            <input
              className="--with-margin-n-8px"
              type="text"
              name="pickupLocation"
              placeholder="Pickup location"
              onChange={handleOnChange}
              value={eventData.pickupLocation}
              required
            />
          )}

          {eventData.transportCheck && (
            <input
              className="--with-margin-n-8px"
              type="text"
              name="dropOffLocation"
              placeholder="Drop-off location"
              onChange={handleOnChange}
              value={eventData.dropOffLocation}
              required
            />
          )}

          {eventData.transportCheck && (
            <textarea
              className="--with-margin-n-8px"
              name="transportDescription"
              cols={30}
              rows={5}
              placeholder="Short description"
              onChange={handleOnChange}
              value={eventData.transportDescription}
              required
            ></textarea>
          )}

          {eventData.transportCheck && (
            <section>
              <input
                className="form__input-120w"
                type="number"
                name="seatsAvailable"
                placeholder="Seats Available"
                onChange={handleOnChange}
                value={eventData.seatsAvailable}
                required
              />
              <b className="--bold-gray">Seats Available</b>
            </section>
          )}

          {eventData.transportCheck && (
            <section>
              <input
                className="form__input-120w"
                type="number"
                name="transportCost"
                placeholder="Cost per person"
                onChange={handleOnChange}
                value={eventData.transportCost}
                required
              />
              <b className="--bold-gray">Cost per passenger (SEK)</b>
            </section>
          )}

          {eventData.transportCheck && (
            <section>
              <input
                className="form__input-120w"
                type="text"
                name="travelTime"
                placeholder="Travel time"
                onChange={handleOnChange}
                value={eventData.travelTime}
                required
              />
              <b className="--bold-gray">Travel Time</b>
            </section>
          )}

          {eventData.transportCheck && (
            <section>
              <input
                className="form__input-120w"
                type="date"
                name="pickupDate"
                placeholder="Pickup Date"
                onChange={handleOnChange}
                value={eventData.pickupDate}
                required
              />
              <b className="--bold-gray">Pickup Date</b>
            </section>
          )}
          {eventData.transportCheck && (
            <section>
              <input
                className="form__input-120w"
                type="time"
                name="pickupTime"
                placeholder="Pickup time"
                onChange={handleOnChange}
                value={eventData.pickupTime}
                required
              />
              <b className="--bold-gray">Pickup Time</b>
            </section>
          )}

          {eventData.transportCheck && (
            <>
              <div className="form__offerings-alone ">
                <input
                  type="checkbox"
                  name="roundTripCheck"
                  checked={eventData.roundTripCheck}
                  onChange={handleOnCheckBox}
                />
                <b className="--bold-gray">Round Trip?</b>
                {eventData.roundTripCheck && (
                  <section className="--gap8px">
                    <input
                      type="date"
                      name="returnDate"
                      placeholder="Return date"
                      onChange={handleOnChange}
                      value={eventData.returnDate}
                    />
                    <input
                      type="time"
                      name="returnTime"
                      placeholder="Return time"
                      onChange={handleOnChange}
                      value={eventData.returnTime}
                      required
                    />
                  </section>
                )}
              </div>
            </>
          )}

          {(eventData.eventCheck || eventData.transportCheck) && (
            <>
              <div className="--spacer-60px"></div>
              <button
                className="action-button absolute-button-bottom-right"
                type="submit"
              >
                Send Invites!
              </button>
            </>
          )}
        </form>

        {!eventData.eventCheck && !eventData.transportCheck && <EasterEgg />}
      </section>
    </>
  );
}
