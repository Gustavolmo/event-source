'use client';
import { EventData } from '@/app-types/types';
import React, { useState } from 'react';
import { deleteEvent } from '@/app-library/DbControls';
import ToggleList from '../ToggleList';

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

  const handleListToggle = (list: boolean, cb: Function) => {
    cb(!list);
  };

  const handleDelete = () => {
    deleteEvent(event._id);
    funcUpdateClick();
  };

  return (
    <>
      <section className="manage__create-by">
        <p className="--grey-text">
          <b className="--grey-text">Created:</b>
          {event.dateCreated}
        </p>
        <p className="--grey-text">
          <b className="--grey-text">By:</b>
          {event.organizerName}
        </p>
      </section>

      {event.eventCheck && !event.transportCheck && (
        <b className="form__section-title">
          EVENT <h4>{event.eventDate}</h4>
        </b>
      )}
      {!event.eventCheck && event.transportCheck && (
        <b className="form__section-title">
          TRANSPORTATION <h4>{event.eventDate}</h4>
        </b>
      )}
      {event.eventCheck && event.transportCheck && (
        <b className="form__section-title">
          EVENT & TRANSIT <h4>{event.eventDate}</h4>
        </b>
      )}

      <button className="action-button absolute-button-top-right">
        Edit [TBD]
      </button>

      <div className="--with-margin-t-8px --with-margin-n-8px">
        <h4 className="--red-highlight-text">{event.eventTitle}</h4>
      </div>

      <ToggleList
        handleListToggle={() => handleListToggle(seeGuests, setSeeGuests)}
        seeList={seeGuests}
        setSeeList={setSeeGuests}
        hasAddGuest={true}
        funcUpdateClick={funcUpdateClick}
        event={event}
        listChoice={event.invited}
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
            funcUpdateClick={funcUpdateClick}
            event={event}
            listChoice={event.acceptedLive}
            buttonTitle={'Yeap!'}
          />

          <ToggleList
            handleListToggle={() => handleListToggle(seeVirtual, setSeeVirtual)}
            seeList={seeVirtual}
            setSeeList={setSeeVirtual}
            hasAddGuest={false}
            funcUpdateClick={funcUpdateClick}
            event={event}
            listChoice={event.acceptedVirtually}
            buttonTitle={'Remote'}
          />

          <ToggleList
            handleListToggle={() =>
              handleListToggle(seeRejected, setSeeRejected)
            }
            seeList={seeRejected}
            setSeeList={setSeeRejected}
            hasAddGuest={false}
            funcUpdateClick={funcUpdateClick}
            event={event}
            listChoice={event.rejected}
            buttonTitle={'Nope'}
          />

          {event.eventCheck && <h5>Event Details</h5>}
          <article className="manage__form-details">
            <p className="--centered-text">
              {!event.multiDayCheck && event.eventDate}
            </p>

            <section className="manage__info-time-date">
              <span className="--centered-text">
                <p>{event.multiDayCheck ? event.eventDate : 'From:'}</p>
                <b>{event.eventTime}</b>
              </span>

              <b> &#128197; </b>

              <span className="--centered-text">
                <p>{event.multiDayCheck ? event.eventEndDate : 'To:'}</p>
                <b>{event.eventEndTime}</b>
              </span>
            </section>

            <section className="manage__info --gray-shading">
              <b>Venue:</b> <p className="--text12px">{event.eventLocation}</p>
            </section>

            <section className="manage__info --gray-shading">
              <b>Rsvp:</b> <p>{event.eventRSVP}</p>
            </section>

            <section className="manage__info --gray-shading">
              <b>Link:</b> <p>{event.virtualLink}</p>
            </section>

            <div className="manage__info-column --gray-shading">
              <div className="--inline-tags">
                <b>Entrance fee:</b> <p>{event.eventCost}kr</p>
              </div>

              <div className="--inline-tags">
                <b>Revenue:</b>{' '}
                <p>{event.eventCost * event.acceptedLive.length}kr</p>
              </div>
            </div>

            <section className="manage__info --gray-shading">
              {event.eventDescription.length < 25 ? (
                <>
                  <b>About:</b> <p>{event.eventDescription}</p>
                </>
              ) : (
                <>
                  <b>About:</b> <p>{event.eventDescription}</p>
                </>
              )}
            </section>
          </article>
        </>
      )}

      {event.transportCheck && (
        <>
          {event.transportCheck && (
            <>
              <h5>Transport Details</h5>
            </>
          )}

          <section className="manage__info-time-date">
            <span className="--centered-text">
              <p>{event.roundTripCheck ? event.eventDate : 'Pickup:'}</p>
              <b>{event.pickupTime}</b>
            </span>

            <b> &#128337; </b>

            <span className="--centered-text">
              <p>{event.roundTripCheck ? event.returnDate : 'Duration:'}</p>
              <b>
                {event.roundTripCheck ? event.returnTime : event.travelTime}
              </b>
            </span>
          </section>

          <section className="manage__info --gray-shading">
            <div>
              {/* {event.roundTripCheck? <div>&#8635;</div> : <p>&#10132;</p>} */}
              {event.roundTripCheck ? (
                <b className="--centered-text">Two-way</b>
              ) : (
                <b className="--centered-text">One-way</b>
              )}
            </div>
            <div>
              <p className=" --text12px">{event.pickupLocation}</p>
              <p className=" --text12px">{}Add Destination to form</p>
            </div>
          </section>

          <ToggleList
            handleListToggle={() => handleListToggle(seePax, setSeePax)}
            seeList={seePax}
            setSeeList={setSeePax}
            hasAddGuest={false}
            funcUpdateClick={funcUpdateClick}
            event={event}
            listChoice={event.passengers}
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
              <b>Revenue:</b>{' '}
              <p>{event.transportCost * event.passengers.length}kr</p>
            </div>
          </div>

          <section className="manage__info --gray-shading">
            {event.eventDescription.length < 12 ? (
              <>
                <b>About the transit:</b> <p>{event.transportDescription}</p>
              </>
            ) : (
              <>
                <b>About:</b> <p>{event.transportDescription}</p>
              </>
            )}
          </section>

          <div className="--spacer-60px"></div>
        </>
      )}

      <button
        className="navbar__button absolute-button-bottom-right"
        onClick={handleDelete}
      >
        Delete
      </button>
    </>
  );
}
