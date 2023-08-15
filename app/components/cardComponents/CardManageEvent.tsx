'use client';
import { EventData } from '@/app-types/types';
import React, { useState } from 'react';
import { deleteEvent } from '@/app-library/DbControls';
import ToggleList from '../ToggleList';
import ToggleDescription from '../ToggleDescription';
import TransitInfoBoard from './TransitInfoBoard';
import EventInfoBoard from './EventInfoBoard';
import TitleSection from './TitleSection';
import GoogleMeetLink from './GoogleMeetLink';
import DeleteButton from '../buttonComponents/DeleteButton';
import EditEvent from './EditEvent';

type Props = {
  event: EventData;
  funcUpdateClick: Function;
};

export default function CardManageEvent({
  event,
  funcUpdateClick: funcUpdateClick,
}: Props) {
  const [seeGuests, setSeeGuests] = useState(false);
  const [seeAccepted, setSeeAccepted] = useState(false);
  const [seeVirtual, setSeeVirtual] = useState(false);
  const [seeRejected, setSeeRejected] = useState(false);
  const [seePax, setSeePax] = useState(false);
  const [seeAboutTransit, setSeeAboutTransit] = useState(false);
  const [seeAboutEvent, setSeeAboutEvent] = useState(false);
  const [toggleCard, setToggleCard] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleListToggle = (list: boolean, cb: Function) => {
    cb(!list);
  };

  const handleDelete = () => {
    deleteEvent(event._id);
    funcUpdateClick();
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleEventToggle = () => {
    setToggleCard(!toggleCard);
  };

  if (edit) {
    return (
      <section className="event-card">
        <EditEvent event={event} handleEdit={handleEdit} funcUpdateClick={funcUpdateClick}/>
        <button
          onClick={handleEdit}
          className="navbar__button absolute-button-top-right"
        >
          cancel
        </button>
      </section>
    );
  }

  if (!toggleCard) {
    return (
      <>
        <section
          className="event-card --pointer-hover"
          onClick={handleEventToggle}
        >
          <button className="navbar__button absolute-top-left --width60px --grey-text">
            Expand
          </button>
          <TitleSection event={event} />
          {event.eventCheck && <EventInfoBoard event={event} />}
          {event.transportCheck && <TransitInfoBoard event={event} showTime={true}/>}
        </section>
      </>
    );
  }

  return (
    <section className="event-card">
      <button
        className="navbar__button absolute-top-left --width60px --grey-text"
        onClick={handleEventToggle}
      >
        Close
      </button>
      <button
        onClick={handleEdit}
        className="action-button absolute-button-top-right"
      >
        Edit
      </button>

      <TitleSection event={event} />

      <ToggleList
        handleListToggle={() => handleListToggle(seeGuests, setSeeGuests)}
        seeList={seeGuests}
        setSeeList={setSeeGuests}
        hasAddGuest={true}
        hasDetails={true}
        funcUpdateClick={funcUpdateClick}
        event={event}
        listChoice={event.invited}
        listName="invited"
        buttonTitle={'All Guests'}
      />

      {event.transportCheck && !event.eventCheck && (
        <div className="--spacer-20px"></div>
      )}

      {event.eventCheck && (
        <>
          <ToggleList
            handleListToggle={() =>
              handleListToggle(seeAccepted, setSeeAccepted)
            }
            seeList={seeAccepted}
            setSeeList={setSeeAccepted}
            hasAddGuest={false}
            hasDetails={true}
            funcUpdateClick={funcUpdateClick}
            event={event}
            listChoice={event.acceptedLive}
            listName="acceptedLive"
            buttonTitle={'Yeap!'}
          />

          {event.virtualLink && (
            <ToggleList
              handleListToggle={() =>
                handleListToggle(seeVirtual, setSeeVirtual)
              }
              seeList={seeVirtual}
              setSeeList={setSeeVirtual}
              hasAddGuest={false}
              hasDetails={false}
              funcUpdateClick={funcUpdateClick}
              event={event}
              listChoice={event.acceptedVirtually}
              listName="acceptedVirtually"
              buttonTitle={'Remote'}
            />
          )}

          <ToggleList
            handleListToggle={() =>
              handleListToggle(seeRejected, setSeeRejected)
            }
            seeList={seeRejected}
            setSeeList={setSeeRejected}
            hasAddGuest={false}
            hasDetails={false}
            funcUpdateClick={funcUpdateClick}
            event={event}
            listChoice={event.rejected}
            listName="rejected"
            buttonTitle={'Nope'}
          />

          {event.eventCheck && <h5>Event Details</h5>}

          <article className="manage__form-details">
            <EventInfoBoard event={event} />

            <section className="manage__info --gray-shading">
              <b>Venue:</b> <p className="--text12px">{event.eventLocation}</p>
            </section>

            <section className="manage__info --gray-shading">
              <b>RSVP:</b> <p>{event.eventRSVP}</p>
            </section>

            <GoogleMeetLink event={event} meetLink="/" />

            <div className="manage__info-column --gray-shading">
              <div className="--inline-tags">
                <b>Price:</b> <p>{event.eventCost}kr</p>
              </div>

              <div className="--inline-tags">
                <b>Expected return:</b>{' '}
                <p>{event.eventCost * event.acceptedLive.length}kr</p>
              </div>
            </div>

            <ToggleDescription
              handleListToggle={handleListToggle}
              seeState={seeAboutEvent}
              setSeeState={setSeeAboutEvent}
              description={event.eventDescription}
            />
          </article>
          {(event.eventCheck && !event.transportCheck) && <div className='--spacer-60px'></div>}
        </>
      )}

      {event.transportCheck && (
        <>
          {event.transportCheck && (
            <>
              <h5>Transport Details</h5>
            </>
          )}

          <TransitInfoBoard event={event} showTime={true}/>

          <ToggleList
            handleListToggle={() => handleListToggle(seePax, setSeePax)}
            seeList={seePax}
            setSeeList={setSeePax}
            hasAddGuest={false}
            hasDetails={true}
            funcUpdateClick={funcUpdateClick}
            event={event}
            listChoice={event.passengers}
            listName="passengers"
            buttonTitle={'Passengers'}
          />

          <section className="manage__info --gray-shading">
            <b>Seats available:</b>{' '}
            <p>
              {event.seatsAvailable - event.passengers.length} out of{' '}
              {event.seatsAvailable}
            </p>
          </section>
          <section className="manage__info --gray-shading">
            <b>Vehicle:</b> <p>{event.transportMode}</p>
          </section>

          <div className="manage__info-column --gray-shading">
            <div className="--inline-tags">
              <b>Transit fee:</b> <p>{event.transportCost}kr</p>
            </div>

            <div className="--inline-tags">
              <b>Expected return:</b>{' '}
              <p>{event.transportCost * event.passengers.length}kr</p>
            </div>
          </div>

          <ToggleDescription
            handleListToggle={handleListToggle}
            seeState={seeAboutTransit}
            setSeeState={setSeeAboutTransit}
            description={event.transportDescription}
          />

          <div className="--spacer-60px"></div>
        </>
      )}

      <DeleteButton
        handleDelete={handleDelete}
        mainText="Delete"
        toRight={true}
      />
    </section>
  );
}
