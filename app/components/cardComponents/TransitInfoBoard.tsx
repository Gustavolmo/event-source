import { EventData } from '@/app-types/types'
import React from 'react'

type Props = {
  event: EventData,
  showTime: boolean
}

export default function TransitInfoBoard(
  {event, showTime}: Props) {
  return (
    <>
    {showTime && <p className="--centered-text">
      {' '}
      {event.roundTripCheck ? 'Round trip' : 'One-way trip'} &#9201;{' '}
      {event.travelTime}
    </p>}
    {event.roundTripCheck ? (
      <section className="manage__info-time-date">
        <div className="--roundtrip-symbol">
          <p className="--text20px">&#10607;</p> {/* ZZZ... */}
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
              <span className="--grey-text">{event.pickupDate}</span>
            </p>
            <b className=" --text12px">{event.pickupLocation}</b>
          </div>

          <div>
            <b className=" --text12px">{event.dropOffLocation}</b>
          </div>
        </article>
      </section>
    )}
    </>
  )
}
