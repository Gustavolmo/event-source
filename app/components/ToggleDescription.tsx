import React from 'react'

type Props = {
  handleListToggle: Function,
  seeState: boolean,
  setSeeState: Function,
  description: string
}

export default function ToggleDescription({
  handleListToggle,
  seeState,
  setSeeState,
  description
}: Props) {
  return (
    <section className="manage__description --gray-shading">
              <div
                onClick={() =>
                  handleListToggle(seeState, setSeeState)
                }
                className="toggle-description-button"
              >
                {' '}
                <div>
                  <b>Event details</b>{' '}
                </div>{' '}
                {seeState ? (
                  <span className="--text12px"> &#128214;</span>
                ) : (
                  <span className="--text12px"> &#128213;</span>
                )}
              </div>

              <div
                className={
                  seeState ? 'description-visible' : 'description-hidden'
                }
              >
                <p>{description}</p>
              </div>
            </section>
  )
}
