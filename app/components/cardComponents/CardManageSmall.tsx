import React from 'react'
import EventInfoBoard from './EventInfoBoard'
import TitleSection from './TitleSection'
import TransitInfoBoard from './TransitInfoBoard'
import { EventData } from '@/app-types/types'

type Props = {
  event: EventData
  handleEventToggle: React.MouseEventHandler<HTMLButtonElement>,
}

export default function CardManageSmall({event, handleEventToggle}: Props) {
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
        className="--centered-text --pointer-hover"
        onClick={handleEventToggle}
      >
        <TitleSection event={event} />
      </section>
      {event.eventCheck && <EventInfoBoard event={event} />}
      {event.transportCheck && (
        <TransitInfoBoard event={event} showTime={true} />
      )}
    </section>
  </>
  )
}
