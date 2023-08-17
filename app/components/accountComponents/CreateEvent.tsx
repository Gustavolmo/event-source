'use client';
import { createNewEvent } from '@/app-library/DbControls';
import { EventData } from '@/app-types/types';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import EasterEgg from '../EasterEgg';
import EventCreatedDialogue from '../dialogueComponents/EventCreatedDialogue';
import FormCheckBox from '../formComponents/FormCheckBox';

type Props = {
  setSelection: Function;
};

export default function CreateEvent({ setSelection }: Props) {
  const date = String(new Date().toDateString());
  const [openDialogue, setOpenDialogue] = useState(false);
  const { data: session } = useSession();
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

  const handleOpenDialogue = () => {
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setSelection('Sent');
    setOpenDialogue(false);
  };

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
    createNewEvent(session?.user?.email, eventData);
    setEventData(defaultFormValues);
    localStorage.removeItem('formData');
    setInvitedEmails([]);
    handleOpenDialogue();
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
            <FormCheckBox
              checkedValue={eventData.eventCheck}
              onChangeFunc={handleOnCheckBox}
              text="Event"
              nameValue="eventCheck"
            />

            <FormCheckBox
              checkedValue={eventData.transportCheck}
              onChangeFunc={handleOnCheckBox}
              text="Transportation"
              nameValue="transportCheck"
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

              <section className="form__offerings">
                <FormCheckBox
                  checkedValue={eventData.virtualLink}
                  onChangeFunc={handleOnCheckBox}
                  text="Add Google meet link?"
                  nameValue="virtualLink"
                />
              </section>
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
                <b className="--bold-gray">Cost per person (SEK)</b>
              </section>

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

              <div className="form__offerings-alone">
                <FormCheckBox
                  checkedValue={eventData.multiDayCheck}
                  onChangeFunc={handleOnCheckBox}
                  text="Ends in a different date?"
                  nameValue="multiDayCheck"
                />

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
                <b className="--bold-gray">Cost per passenger (SEK)</b>
              </section>

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
                <FormCheckBox
                  checkedValue={eventData.roundTripCheck}
                  onChangeFunc={handleOnCheckBox}
                  text="Round Trip?"
                  nameValue="roundTripCheck"
                />

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
