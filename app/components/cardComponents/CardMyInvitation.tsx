import { EventData } from '@/app-types/types'
import React from 'react'
import InvitationList from './InvitationList'
import { useSession } from 'next-auth/react'
import { addGuestToListController, removeGuestFromList } from '@/app-library/InvitationControls'

type Props = {
  event: EventData,
  handleUpdateClick: Function
}

export default function CardMyInvitation({event, handleUpdateClick}: Props) {
  const {data: session, status} = useSession()


  const handleAccept = () => {
    addGuestToListController(session?.user?.email, event._id, 'acceptedLive')
    handleUpdateClick()
  }

  const handleAcceptVirtually = () => {
    addGuestToListController(session?.user?.email, event._id, 'acceptedVirtually')
    handleUpdateClick()
  }
  
  const handleReject = () => {
    addGuestToListController(session?.user?.email, event._id, 'rejected')
    handleUpdateClick()
  }

  const handleJoinRide = () => {
    addGuestToListController(session?.user?.email, event._id, 'passengers')
    handleUpdateClick()
  }

  const handleLeaveRide = () => {
    removeGuestFromList(session?.user?.email, event._id, 'passengers')
    handleUpdateClick()
  }


  return (
    <section className='event-card'>
      
    <p>*<b>Created:</b> {event.dateCreated}</p>
    <p>*<b>By:</b> {event.organizerName}</p>

    <h4>{event.eventTitle}</h4>
    <p>*<b>When:</b> {event.eventDate}</p>

    <div className='guest-list'>*<b>Guest list:</b>
      {event.invited.map((guest, index) => {
        return <InvitationList guest={guest} details={false} key={`${index}_${event._id}`}/>
      })}
    </div>

    {event.eventCheck &&
    <>
    <h5>Event Details</h5>
    <button onClick={handleAccept} className='navbar__button'>Accept</button>
    <button onClick={handleAcceptVirtually} className='navbar__button'>Accept Virtually</button>
    <button onClick={handleReject} className='navbar__button'>Reject</button>
    <p>E*<b>Time:</b> from {event.eventDate} ({event.eventTime}) to: {event.multiDayCheck && event.eventEndDate} ({event.eventEndTime})</p>
    <p>E*<b>Venue:</b> {event.eventLocation}</p>
    <p>E*<b>RSVP:</b> {event.eventRSVP}</p>
    <p>E*<b>Entrance fee:</b> {event.eventCost}kr</p>
    <p>E*<b>Virtual attendance:</b> {event.virtualLink}</p>
    <p>E*<b>About:</b> {event.eventDescription}</p>
    <div>E*<b>Confirmed:</b> {event.acceptedLive.map((guest, index) => {
          return <InvitationList guest={guest} details={false} key={`${index}_${event._id}`}/>
        })}</div>
    <div>E*<b>Confirmed Virtually:</b> {event.acceptedVirtually.map((guest, index) => {
          return <InvitationList guest={guest} details={false} key={`${index}_${event._id}`}/>
        })}</div>
    <div>E*<b>Rejected:</b> {event.rejected.map((guest, index) => {
          return <InvitationList guest={guest} details={false} key={`${index}_${event._id}`}/>
        })}</div>
    </>
    } 
    
    {event.transportCheck &&
    <>
    <h5>Transport Details</h5>

    {/* this could be a component */}
      {event.passengers.includes(String(session?.user?.email))?
      <button onClick={handleLeaveRide} className='navbar__button'>Leave</button>
      :
      (event.passengers.length >= event.seatsAvailable?
        <button className='navbar__button'> FULL </button>
         :
         <button onClick={handleJoinRide} className='navbar__button'>Join</button>)
    }

    <p>T*<b>Vehicle:</b> {event.transportMode}</p>
    <p>T*<b>Transportation fee:</b> {event.transportCost}kr</p>
    <p>T*<b>Pickup time:</b> {event.pickupTime}</p>
    <p>T*<b>Pickup:</b> {event.eventDate} ({event.pickupTime})</p>
      {event.roundTripCheck &&
      <p>T*<b>Return:</b> {event.returnDate} ({event.returnTime})</p>
    }
    <p>T*<b>Seats available:</b> {event.seatsAvailable - event.passengers.length} out of {event.seatsAvailable}</p>
    <p>T*<b>About the transport:</b> {event.transportDescription}</p>
    <div>T*<b>Confirmed Passangers:</b> {event.passengers.map((guest, index) => {
          return <InvitationList guest={guest} details={false} key={`${index}_${event._id}`}/>
        })}</div>
    </>
    }

  </section>
  )
}
