export type GoogleCalendarEvent = {
  kind?: string;
  etag?: unknown;
  id?: string;
  status?: string;
  htmlLink?: string;
  created?: string; // YYYY-MM-DDTHH:MM:SS.sssZ
  updated?: string; // YYYY-MM-DDTHH:MM:SS.sssZ
  summary?: string;
  description?: string;
  location?: string;
  colorId?: string;
  creator?: {
    id?: string;
    email?: string;
    displayName?: string;
    self?: boolean;
  };
  organizer?: {
    id?: string;
    email?: string;
    displayName?: string;
    self?: boolean;
  };
  start?: {
    date?: string;
    dateTime?: string; // YYYY-MM-DDTHH:MM:SS.sssZ
    timeZone?: string;
  };
  end?: {
    date?: string;
    dateTime?: string; // YYYY-MM-DDTHH:MM:SS.sssZ
    timeZone?: string;
  };
  endTimeUnspecified?: boolean;
  recurrence?: string[];
  recurringEventId?: string;
  originalStartTime?: {
    date?: string;
    dateTime?: string; // YYYY-MM-DDTHH:MM:SS.sssZ
    timeZone?: string;
  };
  transparency?: string;
  visibility?: string;
  iCalUID?: string;
  sequence?: number;
  attendees?: {
    id?: string;
    email?: string;
    displayName?: string;
    organizer?: boolean;
    self?: boolean;
    resource?: boolean;
    optional?: boolean;
    responseStatus?: string;
    comment?: string;
    additionalGuests?: number;
  }[];
  attendeesOmitted?: boolean;
  extendedProperties?: {
    private?: {
      key?: string;
    };
    shared?: {
      key?: string;
    };
  };
  hangoutLink?: string;
  conferenceData?: {
    createRequest?: {
      requestId?: string;
      conferenceSolutionKey?: {
        type?: string;
      };
      status?: {
        statusCode?: string;
      };
    };
    entryPoints?: {
      entryPointType?: string;
      uri?: string;
      label?: string;
      pin?: string;
      accessCode?: string;
      meetingCode?: string;
      passcode?: string;
      password?: string;
    }[];
    conferenceSolution?: {
      key?: {
        type?: string;
      };
      name?: string;
      iconUri?: string;
    };
    conferenceId?: string;
    signature?: string;
    notes?: string;
  };
  gadget?: {
    type?: string;
    title?: string;
    link?: string;
    iconLink?: string;
    width?: number;
    height?: number;
    display?: string;
    preferences?: {
      key?: string;
    };
  };
  anyoneCanAddSelf?: boolean;
  guestsCanInviteOthers?: boolean;
  guestsCanModify?: boolean;
  guestsCanSeeOtherGuests?: boolean;
  privateCopy?: boolean;
  locked?: boolean;
  reminders?: {
    useDefault?: boolean;
    overrides?: {
      method?: string;
      minutes?: number;
    }[];
  };
  source?: {
    url?: string;
    title?: string;
  };
  workingLocationProperties?: {
    type?: string;
    homeOffice?: string;
    customLocation?: {
      label?: string;
    };
    officeLocation?: {
      buildingId?: string;
      floorId?: string;
      floorSectionId?: string;
      deskId?: string;
      label?: string;
    };
  };
  attachments?: {
    fileUrl?: string;
    title?: string;
    mimeType?: string;
    iconLink?: string;
    fileId?: string;
  }[];
  eventType?: string;
};

export type GoogleEventResponse = {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  creator: {
    email: string;
    self: boolean;
  };
  organizer: {
    email: string;
    self: boolean;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  iCalUID: string;
  sequence: number;
  attendees: {
    email: string;
    organizer: boolean;
    self: boolean;
    responseStatus: string;
  }[];
  reminders: {
    useDefault: boolean;
  };
  eventType: string;
};