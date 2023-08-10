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
      
      <section className='manage__create-by'>
      <p className='--grey-text'><b className='--grey-text'>Created:</b>{event.dateCreated}</p>
      <p className='--grey-text'><b className='--grey-text'>By:</b>{event.organizerName}</p>
      </section>

      {(event.eventCheck && !event.transportCheck) && <b className="form__section-title">EVENT</b>}
      {(!event.eventCheck && event.transportCheck) && <b className="form__section-title">TRANPOST</b>}
      {(event.eventCheck && event.transportCheck) && <b className="form__section-title">EVENT & TRANSIT</b>}


      <button className='action-button absolute-button-top-right'>Edit [TBD]</button>

      <div className='--with-margin-t-8px --with-margin-n-8px'>
      <h4>{event.eventDate}</h4>
      <h4>{event.eventTitle}</h4>
      </div>

      <div>
        <button className='toggle-button'>Guest list {'>'}</button>
      </div>


        <div className='guest-list'>
          <AddGuestToList eventId={event._id} funcUpdateClick={funcUpdateClick}/>
          {event.invited.map((guest, index) => {
            return <InvitationList guest={guest} details={true} key={`${index}_${event._id}`}/>
          })}
        </div>

      {event.eventCheck &&
      <>
      <h5>Event Details</h5>
      <p><b>Time:</b> from {event.eventDate} ({event.eventTime}) to: {event.multiDayCheck && event.eventEndDate} ({event.eventEndTime})</p>
      <p><b>Venue:</b> {event.eventLocation}</p>
      <p><b>RSVP:</b> {event.eventRSVP}</p>
      <p><b>Entrance fee:</b> {event.eventCost}kr <b>Revenue:</b> {event.eventCost * event.acceptedLive.length}kr</p>
      <p><b>Virtual attendance:</b> {event.virtualLink}</p>
      <p><b>About:</b> {event.eventDescription}</p>
      <div><b>Confirmed:</b> {event.acceptedLive.map((guest, index) => {
          return <InvitationList guest={guest} details={true} key={`${index}_${event._id}`}/>
        })}</div>
      <div><b>Confirmed Virtually:</b> {event.acceptedVirtually.map((guest, index) => {
          return <InvitationList guest={guest} details={false} key={`${index}_${event._id}`}/>
        })}</div>
      <div><b>Rejected:</b> {event.rejected.map((guest, index) => {
          return <InvitationList guest={guest} details={false} key={`${index}_${event._id}`}/>
        })}</div>
      </>
      } 
      
      {event.transportCheck &&
      <>
      <h5>Transport Details</h5>
      <p><b>Vehicle:</b> {event.transportMode}</p>
      <p><b>Transportation fee:</b> {event.transportCost}kr <b>Revenue:</b> {event.transportCost * event.passengers.length}kr</p>
      <p><b>Pickup:</b> {event.eventDate} ({event.pickupTime})</p>
      {event.roundTripCheck &&
      <p><b>Return:</b> {event.returnDate} ({event.returnTime})</p>
    }
      <p><b>Seats available:</b> {event.seatsAvailable - event.passengers.length} out of {event.seatsAvailable}</p>
      <p><b>About the transport:</b> {event.transportDescription}</p>
      <div><b>Confirmed Passangers:</b> {event.passengers.map((guest, index) => {
          return <InvitationList guest={guest} details={false} key={`${index}_${event._id}`}/>
        })}</div>
      </>
      }

    <button className='navbar__button absolute-button-bottom-right' onClick={handleDelete}>Delete</button>

    </section>
  )
}
