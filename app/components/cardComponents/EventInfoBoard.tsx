import { EventData } from '@/app-types/types';
import React from 'react';

type Props = {
  event: EventData
}

export default function EventInfoBoard({event}: Props) {
  return (
    <>
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
    </>
  );
}
