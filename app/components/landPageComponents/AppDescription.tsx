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
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Image
                  className="promo-image-unit"
                  src={createEvent}
                  alt="create-form"
                  width={width}
                  loading="eager"
                />
              </div>
              <div className="flip-card-back">
                <h1 className="">MANAGE ALL IN ONE</h1>
                <b>&#x1F686; Flexible Events &#x1F686;</b>
                <p className="--with-margin-n-16px --with-margin-t-8px">
                  You can create events, transportation or combine both.
                </p>
                <b>&#128197; Google Calendar &#128197;</b>
                <p className="--with-margin-n-16px --with-margin-t-8px ">
                  Create an event and our app will delegate the appropiate
                  number of google events for your specific event and invite all
                  of your guests.
                </p>
                <b>&#128007; Easter Egg &#128007;</b>
                <p className="--with-margin-t-8px ">
                  This part of the app has an easter egg, see if you can find it
                  (:
                </p>
              </div>
            </div>
          </div>
          ;
        </div>

        <div className="promo-image">
          <p className="promo-title">Sync with & edit on Google</p>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Image
                  className="promo-image-unit"
                  src={googleSync}
                  alt="manage-events"
                  width={width}
                  loading="eager"
                />
              </div>
              <div className="flip-card-back">
                <h1 className="">FULLY SYNCED</h1>
                <b>&#9998; Make Changes &#9998;</b>
                <p className="--with-margin-n-16px --with-margin-t-8px">
                  Use google calendar to edit events, add guests, chagnes dates
                  or delete the event, our app will reflect all the changes.
                </p>
                <b>&#9757; Guest Actions &#9757;</b>
                <p className="--with-margin-t-8px ">
                  When guests take actions on your events, event-sauce will
                  display those changes in your own event card.
                </p>
              </div>
            </div>
          </div>
          ;
        </div>

        <div className="promo-image">
          <p className="promo-title">Manage Attendance</p>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Image
                  className="promo-image-unit"
                  src={manageGuest}
                  alt="invitations"
                  width={width}
                  loading="eager"
                />
              </div>
              <div className="flip-card-back">
                <h1 className="">CENTRALIZED INFORMATION</h1>
                <b>&#128221; Guest lists &#128221;</b>
                <p className="--with-margin-n-16px --with-margin-t-8px">
                  All of your guests responses for eventual transportation and
                  the event in one place.
                </p>
                <b>&#128483; Special Needs &#128483;</b>
                <p className="--with-margin-t-8px ">
                  In your guest lists, keep track of dietary restrictions and
                  accessibility needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <Image
          className="promo-image-unit"
          src={guestsInCard}
          alt="invitations"
          width={width}
          loading="eager"
        /> */}
      </section>

      <h2 className="--promo-text-highlight">FOR GUESTS</h2>
      <section className="app-description__section">
        <div className="promo-image">
          <p className="promo-title">Add Preferences</p>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Image
                  className="promo-image-unit"
                  src={guestPreferences}
                  alt="user-profile"
                  width={width}
                  loading="eager"
                />
              </div>
              <div className="flip-card-back">
                <h1 className="">SIMPLE UX</h1>
                <b>&#128235; Adding information &#128235;</b>
                <p className="--with-margin-n-16px --with-margin-t-8px">
                  Guests actions outside of google calendar are kept to a
                  minimum.
                </p>
                <b>&#128101; Guest-centric &#128101;</b>
                <p className="--with-margin-t-8px ">
                  The app is designed to give planners control while minimizing
                  impact on how guests interact with google calendar.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="promo-image">
          <p className="promo-title">Answer Directly on Google</p>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <Image
                  className="promo-image-unit"
                  src={answerOnGoogle}
                  alt="user-profile"
                  width={width}
                  loading="eager"
                />
              </div>
              <div className="flip-card-back">
                <h1 className="">MINIMAL INTERFERENCE</h1>
                <b>&#128232; Responses &#128232;</b>
                <p className="--with-margin-n-16px --with-margin-t-8px">
                  Answer on Google, straight to the organizer&apos;s account.
                </p>
                <b>&#129496; Non-intrusive &#129496;</b>
                <p className="--with-margin-t-8px ">
                  The only time a guest needs to access our website is to add
                  dietary restrictions or accessibility needs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="--spacer-20px"></div>
      </section>
    </>
  );
}

{
  /* <div className="flip-card">
  <div className="flip-card-inner">
    <div className="flip-card-front">
      <Image
            className="promo-image-unit"
            src={createEvent}
            alt="create-form"
            width={width}
            loading="eager"
          />
    </div>
    <div className="flip-card-back">
      <h1 className="">MINIMAL INTERFERENCE</h1>
      <b>&#128232; Responses &#128232;</b>
      <p className="--with-margin-n-16px --with-margin-t-8px">
        Answer on Google, straight to the organizer&apos;s account,
      </p>
      <b>&#129496; Non-intrusive &#129496;</b>
      <p className="--with-margin-t-8px ">
        The only time a guest needs to access our website is to add dietary
        restrictions or accessibility needs.
      </p>
    </div>
  </div>
</div>; */
}
