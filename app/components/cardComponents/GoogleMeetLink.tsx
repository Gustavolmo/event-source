import { EventData } from '@/app-types/types'
import React from 'react'

type Props = {
  event: EventData,
  meetLink: string
}

export default function GoogleMeetLink({event, meetLink}: Props) {
  return event.googleLinkCheck && (
    <section className="manage__info --gray-shading">
        <b>Google Meets:</b>{' '}
        <a href={meetLink} className="--text12px ">
          Feature Coming Soon...
        </a>
    </section>
  )
}
