import { EventData } from '@/app-types/types'
import React from 'react'

export default function CardManageEvent({event}: {event: EventData}) {
  return (
    <section className='event-card'>{JSON.stringify(event)}</section>
  )
}
