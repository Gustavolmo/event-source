import { EventData } from '@/app-types/types';
import React, { MouseEventHandler } from 'react';
import TitleSection from './TitleSection';
import AnswerInvitationButton from '../buttonComponents/AnswerInvitationButton';
import { useSession } from 'next-auth/react';
import ToggleList from './ToggleList';
import EventInfoBoard from './EventInfoBoard';
import GoogleMeetLink from './GoogleMeetLink';
import ToggleDescription from './ToggleDescription';
import TransitInfoBoard from './TransitInfoBoard';
import JoinRideButton from './JoinRideButton';
import DeleteButton from '../buttonComponents/DeleteButton';
import ConfirmDeletionDialogue from '../dialogueComponents/ConfirmDeletionDialogue';
import JoinRideOutboundButton from './JoinRideOutboundButton';

type Props = {
  event: EventData;
  handleEventToggle: MouseEventHandler<HTMLButtonElement>;
  handleAccept: MouseEventHandler<HTMLButtonElement>;
  handleAcceptVirtually: MouseEventHandler<HTMLButtonElement>;
  handleReject: MouseEventHandler<HTMLButtonElement>;
  handleJoinRideInbound: MouseEventHandler<HTMLButtonElement>;
  handleLeaveRideInbound: MouseEventHandler<HTMLButtonElement>;
  handleJoinRideOutbound: MouseEventHandler<HTMLButtonElement>;
  handleLeaveRideOutbound: MouseEventHandler<HTMLButtonElement>;
  handleUpdateClick: Function;
  handleListToggle: Function;
  seeGuests: boolean;
  setSeeGuests: Function;
  seeAccepted: boolean;
  setSeeAccepted: Function;
  seeVirtual: boolean;
  setSeeVirtual: Function;
  seeRejected: boolean;
  setSeeRejected: Function;
  seeAboutEvent: boolean;
  setSeeAboutEvent: Function;
  seePax: boolean;
  setSeePax: Function;
  seePaxOutbound: boolean;
  setSeePaxOutbound: Function;
  seeAboutTransit: boolean;
  setSeeAboutTransit: Function;
  handleOpenDialogue: MouseEventHandler<HTMLButtonElement>;
  handleCloseDialogue: MouseEventHandler<HTMLButtonElement>;
  deleteInvitation: MouseEventHandler<HTMLButtonElement>;
  openDialogue: boolean;
};

export default function CardMyInvitationBig({
  event,
  handleEventToggle,
  handleAccept,
  handleAcceptVirtually,
  handleReject,
  handleJoinRideInbound,
  handleLeaveRideInbound,
  handleJoinRideOutbound,
  handleLeaveRideOutbound,
  handleUpdateClick,
  handleListToggle,
  seeGuests,
  setSeeGuests,
  seeAccepted,
  setSeeAccepted,
  seeVirtual,
  setSeeVirtual,
  seeRejected,
  setSeeRejected,
  seeAboutEvent,
  setSeeAboutEvent,
  seePax,
  setSeePax,
  seePaxOutbound,
  setSeePaxOutbound,
  seeAboutTransit,
  setSeeAboutTransit,
  handleOpenDialogue,
  handleCloseDialogue,
  deleteInvitation,
  openDialogue,
}: Props) {
  const { data: session } = useSession();
  return (
    <>
      <section className="event-card ">
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

        {/* {event.eventCheck && (
          <section className="answer-invite-buttons">
            <AnswerInvitationButton
              handleChoice={handleAccept}
              listChoice={event.acceptedLive}
              userEmail={session?.user?.email}
              buttonType="action-button-positive"
              text="Accept"
            />

            <AnswerInvitationButton
              handleChoice={handleAcceptVirtually}
              listChoice={event.maybeAccepted}
              userEmail={session?.user?.email}
              buttonType="action-button-positive"
              text="Maybe"
            />

            <AnswerInvitationButton
              handleChoice={handleReject}
              listChoice={event.rejected}
              userEmail={session?.user?.email}
              buttonType="action-button"
              text="Reject"
            />
          </section>
        )} */}

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
              listChoice={event.maybeAccepted}
              listName="maybeAccepted"
              buttonTitle={'Maybe'}
            />

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

              {event.rsvpCheck && (
                <section className="manage__info --gray-shading">
                  <b>RSVP:</b>{' '}
                  <p>Guests will be reminded on: {event.eventRSVP}</p>
                </section>
              )}

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

            {/* <JoinRideButton
              event={event}
              handleJoinRide={handleJoinRideInbound}
              handleLeaveRide={handleLeaveRideInbound}
              userEmail={session?.user?.email}
            /> */}

            <ToggleList
              handleListToggle={() => handleListToggle(seePax, setSeePax)}
              seeList={seePax}
              setSeeList={setSeePax}
              hasAddGuest={false}
              hasDetails={false}
              funcUpdateClick={handleUpdateClick}
              event={event}
              listChoice={event.passengersInbound}
              listName="passengersInbound"
              buttonTitle={'Passengers Inbound'}
            />

            {event.roundTripCheck && (
              <>
                {/* <JoinRideOutboundButton
                  event={event}
                  handleJoinRide={handleJoinRideOutbound}
                  handleLeaveRide={handleLeaveRideOutbound}
                  userEmail={session?.user?.email}
                /> */}

                <ToggleList
                  handleListToggle={() =>
                    handleListToggle(seePaxOutbound, setSeePaxOutbound)
                  }
                  seeList={seePaxOutbound}
                  setSeeList={setSeePaxOutbound}
                  hasAddGuest={false}
                  hasDetails={false}
                  funcUpdateClick={handleUpdateClick}
                  event={event}
                  listChoice={event.passengersOutbound}
                  listName="passengersOutbound"
                  buttonTitle={'Passengers Outbound'}
                />
              </>
            )}

            {/* <section className="manage__info --gray-shading">
              <b>Seats available Inbound:</b>{' '}
              <p>
                {event.seatsAvailable - event.passengersInbound.length} out of{' '}
                {event.seatsAvailable}
              </p>
            </section> */}

            {/* <section className="manage__info --gray-shading">
              <b>Seats available Outbound:</b>{' '}
              <p>
                {event.seatsAvailable - event.passengersOutbound.length} out of{' '}
                {event.seatsAvailable}
              </p>
            </section> */}

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
