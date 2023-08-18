import React, { MouseEventHandler } from 'react';
import TitleSection from './TitleSection';
import ToggleList from './ToggleList';
import EventInfoBoard from './EventInfoBoard';
import GoogleMeetLink from './GoogleMeetLink';
import ToggleDescription from './ToggleDescription';
import TransitInfoBoard from './TransitInfoBoard';
import DeleteButton from '../buttonComponents/DeleteButton';
import ConfirmDeletionDialogue from '../dialogueComponents/ConfirmDeletionDialogue';
import { EventData } from '@/app-types/types';

type Props = {
  event: EventData;
  handleEventToggle: MouseEventHandler<HTMLButtonElement>;
  funcUpdateClick: Function;
  handleDelete: Function;
  handleEdit: React.MouseEventHandler<HTMLButtonElement>;
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
  seeAboutTransit: boolean;
  setSeeAboutTransit: Function;
  handleOpenDialogue: MouseEventHandler<HTMLButtonElement>;
  handleCloseDialogue: MouseEventHandler<HTMLButtonElement>;
  openDialogue: boolean;
};

export default function CardManageBig({
  event,
  funcUpdateClick,
  handleDelete,
  handleEdit,
  handleEventToggle,
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
  seeAboutTransit,
  setSeeAboutTransit,
  handleOpenDialogue,
  handleCloseDialogue,
  openDialogue,
}: Props) {
  return (
    <>
      <section className="event-card">
        <button
          className="suttle-button absolute-top-left --width60px --grey-text"
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

        <section
          onClick={handleEventToggle}
          className="--pointer-hover --centered-text"
        >
          <TitleSection event={event} />
        </section>

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

            {event.googleLinkCheck && (
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
            {event.eventCheck && !event.transportCheck && (
              <div className="--spacer-60px"></div>
            )}
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
          handleDelete={handleOpenDialogue}
          mainText="Delete"
          toRight={true}
        />
        <ConfirmDeletionDialogue
          handleClose={handleCloseDialogue}
          handleDeleteAsset={handleDelete}
          open={openDialogue}
        />
      </section>
    </>
  );
}
