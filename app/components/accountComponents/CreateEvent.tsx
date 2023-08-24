'use client';
import { EventData } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import EasterEgg from '../EasterEgg';
import EventCreatedDialogue from '../dialogueComponents/EventCreatedDialogue';
import FormOfferingQuestions from '../formComponents/FormOfferingQuestions';
import { defaultFormValues } from '@/app/defaultEvent';

import { createNewEventInDb } from '@/app-library/DbControls';
import {
  createFromGoogleEvent,
  createGoogleEvent,
  createInboudGoogleEvent,
} from '@/app-library/GoogleCalendarControls/createGoogleEvent';

type Props = {
  redirectToInbox: Function;
};

export default function CreateEvent({ redirectToInbox }: Props) {
  const [openDialogue, setOpenDialogue] = useState(false);
  const { data: session } = useSession();
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  const [eventData, setEventData] = useState<EventData>(defaultFormValues);

  const fillFormFromStorage = () => {
    const storedData = localStorage.getItem('formData');
    if (storedData) setEventData(JSON.parse(storedData));

    const storedEmails = localStorage.getItem('emailList');
    if (storedEmails) setInvitedEmails(JSON.parse(storedEmails));
  };

  const saveFormDataLocally = () => {
    localStorage.setItem('formData', JSON.stringify(eventData));
    localStorage.setItem('emailList', JSON.stringify(invitedEmails));
  };

  useEffect(() => {
    fillFormFromStorage();
  }, []);

  useEffect(() => {
    saveFormDataLocally();
  }, [eventData, invitedEmails]);

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

  const handleOpenDialogue = () => {
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    redirectToInbox();
    setOpenDialogue(false);
  };

  const handleAddEventToDb = () => {
    createNewEventInDb(session?.user?.email, eventData);
  };

  const clearForm = () => {
    setEventData(defaultFormValues);
    setInvitedEmails([]);
    localStorage.removeItem('formData');
    localStorage.removeItem('emailList');
  };

  const handleCreateCalendarEvent = async () => {
    if (session?.accessToken) {
      eventData.invited = invitedEmails;
      eventData.organizerName = String(session?.user?.name);

      if (eventData.eventCheck) {
        const googleRes = await createGoogleEvent(
          session?.accessToken,
          'primary',
          eventData
        );
        eventData.googleEventId = googleRes.id;
        eventData.googleCalendarLink = googleRes.htmlLink;
        if (!eventData.googleEventId) {
          alert('Event Not Created, Something went wrong :(');
          return;
        }
      }

      if (eventData.transportCheck) {
        const googleInboundRes = await createInboudGoogleEvent(
          session?.accessToken,
          'primary',
          eventData
        );
        eventData.googleTransitInboundId = googleInboundRes.id;
        eventData.googleCalendarTripLink = googleInboundRes.htmlLink;
        if (!eventData.googleTransitInboundId) {
          alert('Inbound trip Not Created, Something went wrong :(');
          return;
        }
      }

      if (eventData.roundTripCheck) {
        const googleFromRes = await createFromGoogleEvent(
          session?.accessToken,
          'primary',
          eventData
        );
        eventData.googleTransitFromId = googleFromRes.id;
        if (!eventData.googleTransitFromId) {
          alert('Outbound trip Not Created, Something went wrong :(');
          return;
        }
      }

      handleOpenDialogue();
      // handleAddEventToDb();
      // clearForm();
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!eventData.multiDayCheck) {
      const startTime = new Date(`2000-01-01T${eventData.eventTime}`);
      const endTime = new Date(`2000-01-01T${eventData.eventEndTime}`);
      if (endTime <= startTime) {
        alert('Starting time must be before the ending time (tip: if you end at 00:00 you must specify the event ends the next day)')
        return
      }
    }

    handleCreateCalendarEvent();
  };

  return (
    <>
      <EventCreatedDialogue
        handleClose={handleCloseDialogue}
        open={openDialogue}
      />

      <h2 className="promo-image">CREATE EVENT</h2>

      <section className="event-card">
        <form className="create-event-form" onSubmit={handleFormSubmit}>
          <section className="form__offerings">
            <FormOfferingQuestions
              checkedState={eventData.eventCheck}
              handleOnCheckBox={handleOnCheckBox}
              text="Event"
              checkboxName="eventCheck"
              addDateInput={false}
              addTimeInput={false}
            />

            <FormOfferingQuestions
              checkedState={eventData.transportCheck}
              handleOnCheckBox={handleOnCheckBox}
              text="Transportation"
              checkboxName="transportCheck"
              addDateInput={false}
              addTimeInput={false}
            />
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
            <>
              <input
                className="--with-margin-n-8px"
                type="text"
                name="eventLocation"
                placeholder="Event Venue"
                onChange={handleOnChange}
                value={eventData.eventLocation}
                required
              />

              {/* <section className="form__offerings">
                <FormOfferingQuestions
                  checkedState={eventData.googleLinkCheck}
                  handleOnCheckBox={handleOnCheckBox}
                  text="Add Google meet link?"
                  checkboxName="googleLinkCheck"
                  addDateInput={false}
                  addTimeInput={false}
                />
              </section> */}
            </>
          )}

          {(eventData.eventCheck || eventData.transportCheck) && (
            <div className="--padding-right8px">
              <TagsInput
                name="invited"
                value={invitedEmails}
                onChange={setInvitedEmails}
                placeHolder="Guests email"
              />
            </div>
          )}

          {eventData.eventCheck && (
            <>
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
                <b className="--bold-gray">Event Fee (sek)</b>
              </section>

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

              {/* <FormOfferingQuestions
                text="send RSVP email?"
                checkedState={eventData.rsvpCheck}
                checkboxName="rsvpCheck"
                handleOnCheckBox={handleOnCheckBox}
                handleOnChange={handleOnChange}
                dateInputValue={eventData.eventRSVP}
                dateInputName="eventRSVP"
                addDateInput={true}
                addTimeInput={false}
              /> */}

              <FormOfferingQuestions
                text="Ends another date?"
                checkedState={eventData.multiDayCheck}
                checkboxName="multiDayCheck"
                handleOnCheckBox={handleOnCheckBox}
                handleOnChange={handleOnChange}
                dateInputValue={eventData.eventEndDate}
                dateInputName="eventEndDate"
                addDateInput={true}
                addTimeInput={false}
              />
            </>
          )}

          {eventData.transportCheck && eventData.eventCheck && (
            <b className="form__section-title">TRANSPORT</b>
          )}

          {eventData.transportCheck && (
            <>
              <input
                className="--with-margin-n-8px"
                type="text"
                name="transportMode"
                placeholder="Vehicle details"
                onChange={handleOnChange}
                value={eventData.transportMode}
                required
              />

              <input
                className="--with-margin-n-8px"
                type="text"
                name="pickupLocation"
                placeholder="Pickup location"
                onChange={handleOnChange}
                value={eventData.pickupLocation}
                required
              />

              <input
                className="--with-margin-n-8px"
                type="text"
                name="dropOffLocation"
                placeholder="Drop-off location"
                onChange={handleOnChange}
                value={eventData.dropOffLocation}
                required
              />

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
                <b className="--bold-gray">One-way cost (SEK)</b>
              </section>

              <section>
                <input
                  className="form__input-120w"
                  type="number"
                  name="travelTime"
                  placeholder="Travel time"
                  onChange={handleOnChange}
                  value={eventData.travelTime}
                  required
                />
                <b className="--bold-gray">Travel Time (min)</b>
              </section>

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

              <div className="form__offerings-alone ">
                <FormOfferingQuestions
                  text="Return?"
                  checkedState={eventData.roundTripCheck}
                  checkboxName="roundTripCheck"
                  handleOnCheckBox={handleOnCheckBox}
                  handleOnChange={handleOnChange}
                  dateInputValue={eventData.returnDate}
                  dateInputName="returnDate"
                  addDateInput={true}
                  timeInputName="returnTime"
                  timeInputValue={eventData.returnTime}
                  addTimeInput={true}
                />
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
