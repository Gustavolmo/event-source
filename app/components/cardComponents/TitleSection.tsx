import { EventData } from '@/app-types/types';
import React from 'react';

type Props = {
  event: EventData;
};

export default function TitleSection({ event }: Props) {
  return (
    <>
      <section className="manage__create-by">
        <p className="--grey-text">
          <b className="--grey-text">Created: </b>
          {event.dateCreated}
        </p>
        <p className="--grey-text">
          <b className="--grey-text">By: </b>
          {event.organizerName}
        </p>
      </section>

      <section className=" --margin-top-32px">
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
      </section>

        {event.eventCheck && (
          <div>
            See Google <a href={event.googleCalendarLink}>event</a>
          </div>
        )}
        {event.transportCheck && (
          <div>
            See Google <a href={event.googleCalendarTripLink}>transport</a>
          </div>
        )}
      <div className="--margin12px">
        <h4 className="--red-highlight-text --text20px">
          <b>{event.eventTime}</b> {event.eventTitle}
        </h4>
      </div>
    </>
  );
}
