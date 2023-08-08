'use client'
import { EventData } from '@/app-types/types'
import React from 'react'
import InvitationList from './InvitationList'
import AddGuestToList from './AddGuestToList'

type Props = {
  event: EventData,
  funcUpdate: Function
}

export default function CardManageEvent({event, funcUpdate}: Props) {

  return (
    <section className='event-card'>
      
      <button className='navbar__button'>Edit</button>
      <button className='navbar__button'>Delete</button>

      <h4>{event.eventTitle}</h4>
      <p>*<b>Created:</b> {event.dateCreated}</p>
      <p>*<b>When:</b> {event.eventDate}</p>
      <section>*<b>Guest list:</b>
        <AddGuestToList eventId={event._id} funcUpdate={funcUpdate}/>
        {event.invited.map((guest, index) => {
          return <InvitationList guest={guest} key={`${index}_${event._id}`}/>
        })}
      </section>

      {event.eventCheck &&
      <>
      <h5>Event Details</h5>
      <p>E*<b>Time:</b> from {event.eventTime} to {event.eventEndTime}</p>
      <p>E*<b>Venue:</b> {event.eventLocation}</p>
      <p>E*<b>About:</b> {event.eventDescription}</p>
      <p>E*<b>RSVP:</b> {event.eventRSVP}</p>
      <p>E*<b>Entrance fee:</b> {event.eventCost}kr <b>Revenue:</b> {event.eventCost * event.acceptedLive.length}kr</p>
      <p>E*<b>Virtual attendance:</b> {event.virtualLink}</p>
      <p>E*<b>Confirmed:</b> {event.acceptedLive}</p>
      <p>E*<b>Confirmed Virtually:</b> {event.acceptedVirtually}</p>
      <p>E*<b>Rejected:</b> {event.rejected}</p>
      </>
      } 
      
      {event.transportCheck &&
      <>
      <h5>Transport Details</h5>
      <p>T*<b>Vehicle:</b> {event.transportMode}</p>
      <p>T*<b>Transportation fee:</b> {event.transportCost}kr <b>Revenue:</b> {event.transportCost * event.passengers.length}kr</p>
      <p>T*<b>About the transport:</b> {event.transportDescription}</p>
      <p>T*<b>Pickup time:</b> {event.pickupTime}</p>
      {event.roundTripCheck &&
      <p>T*<b>Return time:</b> {event.returnTime} <b>Return date:</b> {event.returnDate}</p>
      }
      <p>T*<b>Seats available:</b> {event.seatsAvailable}</p>
      <p>T*<b>Confirmed Passangers:</b> {event.passengers}</p>
      </>
      }

    </section>
  )
}
