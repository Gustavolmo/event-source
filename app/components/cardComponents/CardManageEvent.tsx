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
  const [seeAboutTransit, setSeeAboutTransit] = useState(false);
  const [seeAboutEvent, setSeeAboutEvent] = useState(false);

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
        hasDetails={true}
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
            hasDetails={true}
            funcUpdateClick={funcUpdateClick}
            event={event}
            listChoice={event.acceptedLive}
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
            buttonTitle={'Nope'}
          />

          {event.eventCheck && <h5>Event Details</h5>}

          <article className="manage__form-details">
            <p className="--centered-text">
              {!event.multiDayCheck && event.eventDate}
            </p>

            <section className="manage__info-time-date-event">
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
              <b>RSVP:</b> <p>{event.eventRSVP}</p>
            </section>

            {event.virtualLink && (
              <section className="manage__info --gray-shading">
                <>
                  <b>Google Meets:</b>{' '}
                  <a href="/" className="--text12px ">
                    GoogleMeetsLink
                  </a>
                </>
              </section>
            )}

            <div className="manage__info-column --gray-shading">
              <div className="--inline-tags">
                <b>Price:</b> <p>{event.eventCost}kr</p>
              </div>

              <div className="--inline-tags">
                <b>Expected return:</b>{' '}
                <p>{event.eventCost * event.acceptedLive.length}kr</p>
              </div>
            </div>

            <section className="manage__description --gray-shading">
              <div
                onClick={() =>
                  handleListToggle(seeAboutEvent, setSeeAboutEvent)
                }
                className="toggle-description-button"
              >
                {' '}
                <b>Event details</b>{' '}
                {seeAboutEvent ? (
                  <span className="--text12px"> &#128214;</span>
                ) : (
                  <span className="--text12px"> &#128213;</span>
                )}
              </div>

              <div
                className={
                  seeAboutEvent ? 'description-visible' : 'description-hidden'
                }
              >
                <p>{event.eventDescription}</p>
              </div>
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

          <p className="--centered-text">
            {' '}
            {event.roundTripCheck ? 'Round trip' : 'One-way trip'} &#9201;{' '}
            {event.travelTime}
          </p>
          {event.roundTripCheck ? (
            <section className="manage__info-time-date">
              <div className="--roundtrip-symbol">
                <p className="--text20px">&#10607;</p>
              </div>

              <article>
                <div>
                  <p>
                    {' '}
                    <b>{event.pickupTime}</b>{' '}
                    <span className="--grey-text">{event.pickupDate}</span>
                  </p>
                  <b className=" --text12px">{event.pickupLocation}</b>
                </div>

                <div>
                  <p>
                    {' '}
                    <b>{event.returnTime}</b>{' '}
                    <span className="--grey-text">{event.returnDate}</span>
                  </p>
                  <b className=" --text12px">{event.dropOffLocation}</b>
                </div>
              </article>
            </section>
          ) : (
            <section className="manage__info-time-date">
              <div className="--oneway-symbol">
                <p className="--text20px">&#11107;</p>
              </div>

              <article>
                <div>
                  <p>
                    {' '}
                    <b>{event.pickupTime}</b>{' '}
                    <span className="--grey-text">{event.pickupDate} HC</span>
                  </p>
                  <b className=" --text12px">{event.pickupLocation}</b>
                </div>

                <div>
                  <b className=" --text12px">{event.dropOffLocation}</b>
                </div>
              </article>
            </section>
          )}

          <ToggleList
            handleListToggle={() => handleListToggle(seePax, setSeePax)}
            seeList={seePax}
            setSeeList={setSeePax}
            hasAddGuest={false}
            hasDetails={false}
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
              <b>Expected return:</b>{' '}
              <p>{event.transportCost * event.passengers.length}kr</p>
            </div>
          </div>

          <section className="manage__description --gray-shading">
            <div
              onClick={() =>
                handleListToggle(seeAboutTransit, setSeeAboutTransit)
              }
              className="toggle-description-button"
            >
              {' '}
              <div>
                <b>Transit details</b>{' '}
              </div>{' '}
              {seeAboutTransit ? (
                <span className="--text12px"> &#128214;</span>
              ) : (
                <span className="--text12px"> &#128213;</span>
              )}
            </div>

            <div
              className={
                seeAboutTransit ? 'description-visible' : 'description-hidden'
              }
            >
              <p>{event.transportDescription}</p>
            </div>
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
