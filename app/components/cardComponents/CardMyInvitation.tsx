import { EventData } from '@/app-types/types';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  addGuestToListController,
  removeGuestFromList,
} from '@/app-library/InvitationControls';
import CardMyInvitationSmall from './CardMyInvitationSmall';
import CardMyInvitationBig from './CardMyInvitationBig';

type Props = {
  event: EventData;
  handleUpdateClick: Function;
};

export default function CardMyInvitation({ event, handleUpdateClick }: Props) {
  const { data: session, status } = useSession();
  const [seeGuests, setSeeGuests] = useState(false);
  const [seeAccepted, setSeeAccepted] = useState(false);
  const [seeVirtual, setSeeVirtual] = useState(false);
  const [seeRejected, setSeeRejected] = useState(false);
  const [seePax, setSeePax] = useState(false);
  const [seeAboutTransit, setSeeAboutTransit] = useState(false);
  const [seeAboutEvent, setSeeAboutEvent] = useState(false);
  const [toggleCard, setToggleCard] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);

  const handleListToggle = (list: boolean, cb: Function) => {
    cb(!list);
  };

  const deleteInvitation = () => {
    handleUpdateClick();
    removeGuestFromList(session?.user?.email, event._id, 'invited');
    removeGuestFromList(session?.user?.email, event._id, 'acceptedVirtually');
    removeGuestFromList(session?.user?.email, event._id, 'rejected');
    removeGuestFromList(session?.user?.email, event._id, 'acceptedLive');
    removeGuestFromList(session?.user?.email, event._id, 'passengers');
  };

  const handleOpenDialogue = () => {
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
  };

  const handleAcceptInvitation = () => {
    addGuestToListController(session?.user?.email, event._id, 'acceptedLive');
    handleUpdateClick();
  };

  const handleAcceptVirtually = () => {
    addGuestToListController(
      session?.user?.email,
      event._id,
      'acceptedVirtually'
    );
    handleUpdateClick();
  };

  const handleRejectInvitation = () => {
    addGuestToListController(session?.user?.email, event._id, 'rejected');
    handleUpdateClick();
  };

  const handleJoinRide = () => {
    addGuestToListController(session?.user?.email, event._id, 'passengers');
    handleUpdateClick();
  };

  const handleLeaveRide = () => {
    removeGuestFromList(session?.user?.email, event._id, 'passengers');
    handleUpdateClick();
  };

  const handleEventToggle = () => {
    setToggleCard(!toggleCard);
  };

  if (!toggleCard) {
    return (
      <CardMyInvitationSmall
        event={event}
        handleEventToggle={handleEventToggle}
        handleAccept={handleAcceptInvitation}
        handleAcceptVirtually={handleAcceptVirtually}
        handleReject={handleRejectInvitation}
        handleJoinRide={handleJoinRide}
        handleLeaveRide={handleLeaveRide}
      />
    );
  }

  return (
    <CardMyInvitationBig
      event={event}
      handleEventToggle={handleEventToggle}
      handleAccept={handleAcceptInvitation}
      handleAcceptVirtually={handleAcceptVirtually}
      handleReject={handleRejectInvitation}
      handleJoinRide={handleJoinRide}
      handleLeaveRide={handleLeaveRide}
      handleUpdateClick={handleUpdateClick}
      handleListToggle={handleListToggle}
      seeGuests={seeGuests}
      setSeeGuests={setSeeGuests}
      seeAccepted={seeAccepted}
      setSeeAccepted={setSeeAccepted}
      seeVirtual={seeVirtual}
      setSeeVirtual={setSeeVirtual}
      seeRejected={seeRejected}
      setSeeRejected={setSeeRejected}
      seeAboutEvent={seeAboutEvent}
      setSeeAboutEvent={setSeeAboutEvent}
      seePax={seePax}
      setSeePax={setSeePax}
      seeAboutTransit={seeAboutTransit}
      setSeeAboutTransit={setSeeAboutTransit}
      handleOpenDialogue={handleOpenDialogue}
      handleCloseDialogue={handleCloseDialogue}
      deleteInvitation={deleteInvitation}
      openDialogue={openDialogue}
    />
  );
}
