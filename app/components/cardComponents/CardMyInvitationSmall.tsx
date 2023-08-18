import { useSession } from 'next-auth/react';
import TitleSection from './TitleSection';
import AnswerInvitationButton from '../buttonComponents/AnswerInvitationButton';
import EventInfoBoard from './EventInfoBoard';
import JoinRideButton from './JoinRideButton';
import TransitInfoBoard from './TransitInfoBoard';
import { EventData } from '@/app-types/types';
import { MouseEventHandler } from 'react';

type Props = {
  event: EventData
  handleEventToggle: MouseEventHandler<HTMLButtonElement>
  handleAccept: MouseEventHandler<HTMLButtonElement>
  handleAcceptVirtually: MouseEventHandler<HTMLButtonElement>
  handleReject: MouseEventHandler<HTMLButtonElement>
  handleJoinRide: MouseEventHandler<HTMLButtonElement>
  handleLeaveRide: MouseEventHandler<HTMLButtonElement>
};

export default function CardMyInvitationSmall({
  event,
  handleEventToggle,
  handleAccept,
  handleAcceptVirtually,
  handleReject,
  handleJoinRide,
  handleLeaveRide,
}: Props) {
  const { data: session } = useSession();
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

              {event.googleLinkCheck && (
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
