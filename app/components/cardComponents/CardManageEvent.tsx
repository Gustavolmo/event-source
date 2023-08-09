'use client'
import { EventData } from '@/app-types/types'
import React from 'react'
import InvitationList from './InvitationList'
import AddGuestToList from './AddGuestToList'
import { deleteEvent } from '@/app-library/DbControls'

type Props = {
  event: EventData,
  funcUpdateClick: Function
}

export default function CardManageEvent({event, funcUpdateClick: funcUpdateClick}: Props) {

  const handleDelete = () => {
    deleteEvent(event._id)
    funcUpdateClick()
  }

  return (
    <section className='event-card'>
      
      <p>*<b>Created:</b> {event.dateCreated}</p>
      <p>*<b>By:</b> {event.organizerName}</p>

      <button className='navbar__button'>Edit [TBD]</button>
      <button className='navbar__button' onClick={handleDelete}>Delete</button>

      <h4>{event.eventTitle}</h4>
      <p>*<b>When:</b> {event.eventDate}</p>

      <section className='guest-list'>*<b>Guest list:</b>
        <AddGuestToList eventId={event._id} funcUpdateClick={funcUpdateClick}/>
        {event.invited.map((guest, index) => {
          return <InvitationList guest={guest} details={true} key={`${index}_${event._id}`}/>
        })}
      </section>

      {event.eventCheck &&
      <>
      <h5>Event Details</h5>
      <p>E*<b>Time:</b> from {event.eventDate} ({event.eventTime}) to: {event.multiDayCheck && event.eventEndDate} ({event.eventEndTime})</p>
      <p>E*<b>Venue:</b> {event.eventLocation}</p>
      <p>E*<b>RSVP:</b> {event.eventRSVP}</p>
      <p>E*<b>Entrance fee:</b> {event.eventCost}kr <b>Revenue:</b> {event.eventCost * event.acceptedLive.length}kr</p>
      <p>E*<b>Virtual attendance:</b> {event.virtualLink}</p>
      <p>E*<b>About:</b> {event.eventDescription}</p>
      <p>E*<b>Confirmed:</b> {event.acceptedLive.map((guest, index) => {
          return <InvitationList guest={guest} details={true} key={`${index}_${event._id}`}/>
        })}</p>
      <p>E*<b>Confirmed Virtually:</b> {event.acceptedVirtually.map((guest, index) => {
          return <InvitationList guest={guest} details={false} key={`${index}_${event._id}`}/>
        })}</p>
      <p>E*<b>Rejected:</b> {event.rejected.map((guest, index) => {
          return <InvitationList guest={guest} details={false} key={`${index}_${event._id}`}/>
        })}</p>
      </>
      } 
      
      {event.transportCheck &&
      <>
      <h5>Transport Details</h5>
      <p>T*<b>Vehicle:</b> {event.transportMode}</p>
      <p>T*<b>Transportation fee:</b> {event.transportCost}kr <b>Revenue:</b> {event.transportCost * event.passengers.length}kr</p>
      <p>T*<b>Pickup:</b> {event.eventDate} ({event.pickupTime})</p>
      {event.roundTripCheck &&
      <p>T*<b>Return:</b> {event.returnDate} ({event.returnTime})</p>
    }
      <p>T*<b>Seats available:</b> {event.seatsAvailable - event.passengers.length} out of {event.seatsAvailable}</p>
      <p>T*<b>About the transport:</b> {event.transportDescription}</p>
      <p>T*<b>Confirmed Passangers:</b> {event.passengers.map((guest, index) => {
          return <InvitationList guest={guest} details={false} key={`${index}_${event._id}`}/>
        })}</p>
      </>
      }

    </section>
  )
}
