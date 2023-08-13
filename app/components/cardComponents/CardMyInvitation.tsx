import { EventData } from '@/app-types/types';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  addGuestToListController,
  removeGuestFromList,
} from '@/app-library/InvitationControls';
import ToggleList from '../ToggleList';
import ToggleDescription from '../ToggleDescription';

type Props = {
  event: EventData;
  handleUpdateClick: Function;
};

export default function CardMyInvitation({ event, handleUpdateClick }: Props) {
  const { data: session, status } = useSession();
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

  const handleAccept = () => {
    addGuestToListController(session?.user?.email, event._id, 'acceptedLive');
    handleUpdateClick();
  };

  const handleAcceptVirtually = () => {
    addGuestToListController(
      session?.user?.email,
      event._id,
      'acceptedVirtually'
    );
    handleUpdateClick();
  };

  const handleReject = () => {
    addGuestToListController(session?.user?.email, event._id, 'rejected');
    handleUpdateClick();
  };

  const handleJoinRide = () => {
    addGuestToListController(session?.user?.email, event._id, 'passengers');
    handleUpdateClick();
  };

  const handleLeaveRide = () => {
    removeGuestFromList(session?.user?.email, event._id, 'passengers');
    handleUpdateClick();
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
          EVENT <p>{event.eventDate}</p>
        </b>
      )}
      {!event.eventCheck && event.transportCheck && (
        <b className="form__section-title">
          TRANSPORTATION <span>{event.eventDate}</span>
        </b>
      )}
      {event.eventCheck && event.transportCheck && (
        <b className="form__section-title">
          EVENT & TRANSIT <h4>{event.eventDate}</h4>
        </b>
      )}

      <div className="--margin12px">
        <h4 className="--red-highlight-text">
          {' '}
          <b>{event.eventTime}</b> {event.eventTitle}
        </h4>
      </div>

      {event.eventCheck && (
        <section className="answer-invite-buttons">
          <button onClick={handleAccept} className="action-button">
            Accept
          </button>
          <button onClick={handleAcceptVirtually} className="action-button">
            Remote
          </button>
          <button onClick={handleReject} className="action-button">
            Reject
          </button>
        </section>
      )}

      <ToggleList
        handleListToggle={() => handleListToggle(seeGuests, setSeeGuests)}
        seeList={seeGuests}
        setSeeList={setSeeGuests}
        hasAddGuest={false}
        hasDetails={false}
        funcUpdateClick={handleUpdateClick}
        event={event}
        listChoice={event.invited}
        buttonTitle={'All Guests'}
      />

      {event.eventCheck && (
        <>
          <ToggleList
            handleListToggle={() =>
              handleListToggle(seeAccepted, setSeeAccepted)
            }
            seeList={seeAccepted}
            setSeeList={setSeeAccepted}
            hasAddGuest={false}
            hasDetails={false}
            funcUpdateClick={handleUpdateClick}
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
              funcUpdateClick={handleUpdateClick}
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
            funcUpdateClick={handleUpdateClick}
            event={event}
            listChoice={event.rejected}
            buttonTitle={'Nope'}
          />

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
            </div>

            <ToggleDescription 
            handleListToggle={handleListToggle}
            seeState={seeAboutEvent}
            setSeeState={setSeeAboutEvent}
            description={event.eventDescription}
            />

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

          <p className="--centered-text"> &#9201; {event.travelTime}</p>
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

          {/* this could be a component */}
          <section className="--margin-ltr16px">
            {event.passengers.includes(String(session?.user?.email)) ? (
              <button onClick={handleLeaveRide} className="navbar__button">
                Leave
              </button>
            ) : event.passengers.length >= event.seatsAvailable ? (
              <button className="navbar__button"> FULL </button>
            ) : (
              <button onClick={handleJoinRide} className="action-button">
                Join
              </button>
            )}
          </section>

          <ToggleList
            handleListToggle={() => handleListToggle(seePax, setSeePax)}
            seeList={seePax}
            setSeeList={setSeePax}
            hasAddGuest={false}
            hasDetails={false}
            funcUpdateClick={handleUpdateClick}
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
    </>
  );
}
