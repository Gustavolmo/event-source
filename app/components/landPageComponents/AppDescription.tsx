'use client';
import React from 'react';
import Image from 'next/image';
import createEvent from '../../assets/create-events.png';
import googleSync from '../../assets/google-sync.png';
import manageGuest from '../../assets/manage-guests.png';
import guestPreferences from '../../assets/guest-preference.png';
import answerOnGoogle from '../../assets/answer-on-google.png';
import guestsInCard from '../../assets/guests-in-card.png';

import { signIn } from 'next-auth/react';

export default async function AppDescription() {
  const width = '332';
  return (
    <>
      <header className="app-description">
        <h1>
          Welcome to <i className="--red-highlight-text">EventSauce</i>
          <p>Free & Open-source Event Managment</p>
        </h1>
        
        <div>
          <button className="action-button --text12px" onClick={() => signIn()}>
            Try our Beta
          </button>
        </div>

        <h1>Features</h1>

        <p>Keep track of guest lists</p>
        <p>Full sync with Google Calendar</p>
        <p>Let guests tell you their preferences</p>
        <p>Manage Transit & Events in one place</p>
      </header>

      <h1 className="--promo-text-highlight">FOR PLANNERS</h1>
      <section className="app-description__section">
        <div className="promo-image">
          <p className="promo-title">Create Events</p>
          <Image
            className="promo-image-unit"
            src={createEvent}
            alt="create-form"
            width={width}
            loading="eager"
          />
        </div>

        <div className="promo-image">
          <p className="promo-title">Sync with & edit on Google</p>
          <Image
            className="promo-image-unit"
            src={googleSync}
            alt="manage-events"
            width={width}
            loading="eager"
          />
        </div>

        <div className="promo-image">
          <p className="promo-title">Manage Guests</p>
          <Image
            className="promo-image-unit"
            src={manageGuest}
            alt="invitations"
            width={width}
            loading="eager"
          />
        </div>
        <Image
          className="promo-image-unit"
          src={guestsInCard}
          alt="invitations"
          width={width}
          loading="eager"
        />
      </section>

      <h2 className="--promo-text-highlight">FOR GUESTS</h2>
      <section className="app-description__section">
        <div className="promo-image">
          <p className="promo-title">Add Preferences</p>
          <Image
            className="promo-image-unit"
            src={guestPreferences}
            alt="user-profile"
            width={width}
            loading="eager"
          />
        </div>

        <div className="promo-image">
          <p className="promo-title">Answer Directly on Google</p>
          <Image
            className="promo-image-unit"
            src={answerOnGoogle}
            alt="user-profile"
            width={width}
            loading="eager"
          />
        </div>

        <div className="--spacer-20px"></div>
      </section>
    </>
  );
}
