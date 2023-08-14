import { EventData } from '@/app-types/types';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  addGuestToListController,
  removeGuestFromList,
} from '@/app-library/InvitationControls';
import ToggleList from '../ToggleList';
import ToggleDescription from '../ToggleDescription';
import AnswerInvitationButton from '../buttonComponents/AnswerInvitationButton';
import TransitInfoBoard from './TransitInfoBoard';
import EventInfoBoard from './EventInfoBoard';
import JoinRideButton from './JoinRideButton';
import TitleSection from './TitleSection';
import GoogleMeetLink from './GoogleMeetLink';

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
  const [toggleCard, setToggleCard] = useState(false);

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

  const handleEventToggle = () => {
    setToggleCard(!toggleCard);
  };

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
          {event.transportCheck && <TransitInfoBoard event={event} />}
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
        Collapse
      </button>

      <TitleSection event={event} />

      {event.eventCheck && (
        <section className="answer-invite-buttons">
          <AnswerInvitationButton
            handleChoice={handleAccept}
            listChoice={event.acceptedLive}
            userEmail={session?.user?.email}
            text="Accept"
          />

          {event.virtualLink && (
            <AnswerInvitationButton
              handleChoice={handleAcceptVirtually}
              listChoice={event.acceptedVirtually}
              userEmail={session?.user?.email}
              text="Remote"
            />
          )}

          <AnswerInvitationButton
            handleChoice={handleReject}
            listChoice={event.rejected}
            userEmail={session?.user?.email}
            text="Reject"
          />
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

          <TransitInfoBoard event={event} />

          <JoinRideButton
            event={event}
            handleJoinRide={handleJoinRide}
            handleLeaveRide={handleLeaveRide}
            userEmail={session?.user?.email}
          />

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
    </section>
  );
}
