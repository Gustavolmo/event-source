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
          <p>A centralized way to manage events</p>
        </h1>

        <div>
          <button className="action-button --text12px" onClick={() => signIn()}>
            Try our Beta
          </button>
        </div>

        <section className="app-drescription__features">
          <li>Keep track of guest lists</li>
          <li>Full sync with Google Calendar</li>
          <li>Let guests tell you their preferences</li>
          <li>Manage Transit & Events in one place</li>
        </section>
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
          <p className="promo-title">Manage Attendance</p>
          <Image
            className="promo-image-unit"
            src={manageGuest}
            alt="invitations"
            width={width}
            loading="eager"
          />
          <Image
            className="promo-image-unit"
            src={guestsInCard}
            alt="invitations"
            width={width}
            loading="eager"
          />
        </div>
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

      <div className="--spacer-60px"></div>
      <footer className="footer">
        <p className="home__about"> &#x1F4BB; </p>{' '}
      </footer>
      <footer className="footer-bottom">
        <p className="home__about">You can find the repo for the project</p>
        <a className="home__about" href="https://github.com/Gustavolmo">
          HERE
        </a>
      </footer>
      <footer  className="footer-bottom">
        <p className="home__about">This app was developed by lmo.gustavo@gmail.com</p>
      </footer>
    </>
  );
}
