// generate data object from state
export const GenerateObject = (attendance, events, users, locations, isAdmin) => {
    const event = events?.filter(event => event.id === attendance.event_id)[0];
    const user = users?.filter(user => user.id === attendance.user_id)[0];
    const location = locations?.filter(location => location.id === attendance.location_id)[0];
    return ({
        name: `${user?.firstname} ${user?.lastname}`,
        email: `${user?.username}`,
        eventName: `${event?.title}`,
        eventLocation: `${location?.building} - ${location?.room}`,
        rsvp: `${attendance.RSVP}`,
        id: attendance.id,
    });
};
// headers
export const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'User',
    },
    {
      id: 'rsvp',
      numeric: false,
      disablePadding: false,
      label: 'Answer',
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email',
    },
    {
      id: 'eventName',
      numeric: false,
      disablePadding: false,
      label: 'Event',
    },
    {
      id: 'eventLocation',
      numeric: false,
      disablePadding: false,
      label: 'Location',
    },
  ];