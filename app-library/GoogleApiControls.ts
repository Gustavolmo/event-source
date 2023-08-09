/*
================================================
FUTURE GOOGLE CALENDAR IMPLEMENTATION
================================================

export const updateCalendarForInvitedUsers = async (newEvent) => {
  const invitedUsers = newEvent.invited;
  const accessTokenPromises = invitedUsers.map(async (email) => {
    const response = await fetch('/api/update-calendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        event: newEvent
      })
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to retrieve access token');
  });

  const accessTokens = await Promise.all(accessTokenPromises);

  const createEventPromises = accessTokens.map(async (accessToken) => {
    const response = await fetch('/api/create-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accessToken,
        event: newEvent
      })
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to create event');
  });

  await Promise.all(createEventPromises);

  console.log('Event created successfully for all invited users');
};
*/
