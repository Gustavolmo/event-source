import { EventData } from '@/app-types/types';
import React, { useEffect, useState } from 'react';
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
import ConfirmDeletionDialogue from '../ConfirmDeletionDialogue';
import DeleteButton from '../buttonComponents/DeleteButton';

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
  const [openDialogue, setOpenDialogue] = useState(false);

  const handleListToggle = (list: boolean, cb: Function) => {
    cb(!list);
  };

  const deleteInvitation = () => {
    handleUpdateClick();
    removeGuestFromList(session?.user?.email, event._id, 'invited');
    removeGuestFromList(session?.user?.email, event._id, 'acceptedVirtually');
    removeGuestFromList(session?.user?.email, event._id, 'rejected');
    removeGuestFromList(session?.user?.email, event._id, 'acceptedLive');
    removeGuestFromList(session?.user?.email, event._id, 'passengers');
  };

  const handleOpenDialogue = () => {
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
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
        <section className="event-card">
          <button
            onClick={handleEventToggle}
            className="suttle-button absolute-top-left --width60px"
          >
            Expand
          </button>

          <section
            onClick={handleEventToggle}
            className="--pointer-hover --centered-text"
          >
            <TitleSection event={event} />
          </section>

          {event.eventCheck && (
            <>
              <section className="answer-invite-buttons">
                <AnswerInvitationButton
                  handleChoice={handleAccept}
                  listChoice={event.acceptedLive}
                  userEmail={session?.user?.email}
                  buttonType="action-button-positive"
                  text="Accept"
                />

                {event.virtualLink && (
                  <AnswerInvitationButton
                    handleChoice={handleAcceptVirtually}
                    listChoice={event.acceptedVirtually}
                    userEmail={session?.user?.email}
                    buttonType="action-button-positive"
                    text="Remote"
                  />
                )}

                <AnswerInvitationButton
                  handleChoice={handleReject}
                  listChoice={event.rejected}
                  userEmail={session?.user?.email}
                  buttonType="action-button"
                  text="Reject"
                />
              </section>
            </>
          )}

          {event.eventCheck && <EventInfoBoard event={event} />}

          {event.transportCheck && (
            <div>
              <div className="--spacer-20px"></div>
              {event.eventCheck && <h4>Transport</h4>}
              <div className="--self-centered">
                <JoinRideButton
                  event={event}
                  handleJoinRide={handleJoinRide}
                  handleLeaveRide={handleLeaveRide}
                  userEmail={session?.user?.email}
                />
              </div>

              <div className="--spacer-8px"></div>
              <TransitInfoBoard event={event} showTime={false} />
            </div>
          )}
          <div className="--spacer-20px"></div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="event-card">
        <button
          className="suttle-button absolute-top-left --width60px --grey-text"
          onClick={handleEventToggle}
        >
          Collapse
        </button>

        <section
          onClick={handleEventToggle}
          className="--pointer-hover --centered-text"
        >
          <TitleSection event={event} />
        </section>

        {event.eventCheck && (
          <section className="answer-invite-buttons">
            <AnswerInvitationButton
              handleChoice={handleAccept}
              listChoice={event.acceptedLive}
              userEmail={session?.user?.email}
              buttonType="action-button-positive"
              text="Accept"
            />

            {event.virtualLink && (
              <AnswerInvitationButton
                handleChoice={handleAcceptVirtually}
                listChoice={event.acceptedVirtually}
                userEmail={session?.user?.email}
                buttonType="action-button-positive"
                text="Remote"
              />
            )}

            <AnswerInvitationButton
              handleChoice={handleReject}
              listChoice={event.rejected}
              userEmail={session?.user?.email}
              buttonType="action-button"
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
          listName="invited"
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
                funcUpdateClick={handleUpdateClick}
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
              funcUpdateClick={handleUpdateClick}
              event={event}
              listChoice={event.rejected}
              listName="rejected"
              buttonTitle={'Nope'}
            />

            <article className="manage__form-details">
              <EventInfoBoard event={event} />

              <section className="manage__info --gray-shading">
                <b>Venue:</b>{' '}
                <p className="--text12px">{event.eventLocation}</p>
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
              {!event.transportCheck && <div className="--spacer-60px"></div>}
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

            <TransitInfoBoard event={event} showTime={true} />

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
          handleDelete={handleOpenDialogue}
          mainText="Ignore & Delete"
          toRight={true}
        />
        <ConfirmDeletionDialogue
          handleClose={handleCloseDialogue}
          handleDeleteAsset={deleteInvitation}
          open={openDialogue}
        />
      </section>
    </>
  );
}
