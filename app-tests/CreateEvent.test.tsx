// import { render, screen, fireEvent } from '@testing-library/react';
// import CreateEvent from '../app/components/accountComponents/CreateEvent';

// describe('CreateEvent', () => {
//   test('renders event form correctly', () => {
//     render(<CreateEvent />);
    
//     // Check if event options are displayed
//     const eventCheck = screen.getByLabelText('An Event');
//     const transportCheck = screen.getByLabelText('Transportation');
//     expect(eventCheck).toBeInTheDocument();
//     expect(transportCheck).toBeInTheDocument();

//     // Check if event fields are displayed
//     const eventTitle = screen.getByPlaceholderText('Event Title');
//     const eventLocation = screen.getByPlaceholderText('Event Venue');
//     const eventCost = screen.getByPlaceholderText('Cost per person');
//     const eventRSVP = screen.getByPlaceholderText('RSVP');
//     const virtualLink = screen.getByPlaceholderText('Virtual Attendance Link');
//     const eventDate = screen.getByPlaceholderText('Event date');
//     const eventTime = screen.getByPlaceholderText('Event time');
//     const eventDuration = screen.getByPlaceholderText('Event duration');
//     const eventDescription = screen.getByPlaceholderText('Description');
//     expect(eventTitle).toBeInTheDocument();
//     expect(eventLocation).toBeInTheDocument();
//     expect(eventCost).toBeInTheDocument();
//     expect(eventRSVP).toBeInTheDocument();
//     expect(virtualLink).toBeInTheDocument();
//     expect(eventDate).toBeInTheDocument();
//     expect(eventTime).toBeInTheDocument();
//     expect(eventDuration).toBeInTheDocument();
//     expect(eventDescription).toBeInTheDocument();

//     // Check if transport fields are displayed
//     const transportMode = screen.getByPlaceholderText('Transport mode');
//     const transportCost = screen.getByPlaceholderText('Cost per person');
//     const pickupLocation = screen.getByPlaceholderText('Pickup location');
//     const pickupTime = screen.getByPlaceholderText('Pickup time');
//     const returnTime = screen.getByPlaceholderText('Return time');
//     const travelTime = screen.getByPlaceholderText('Travel time');
//     const seatsAvailable = screen.getByPlaceholderText('Seats Available');
//     const transportDescription = screen.getByPlaceholderText('Descritpion');
//     expect(transportMode).toBeInTheDocument();
//     expect(transportCost).toBeInTheDocument();
//     expect(pickupLocation).toBeInTheDocument();
//     expect(pickupTime).toBeInTheDocument();
//     expect(returnTime).toBeInTheDocument();
//     expect(travelTime).toBeInTheDocument();
//     expect(seatsAvailable).toBeInTheDocument();
//     expect(transportDescription).toBeInTheDocument();

//     // Check if submit button is displayed
//     const submitButton = screen.getByText('Create Event!');
//     expect(submitButton).toBeInTheDocument();
//   });

//   test('handles form submission correctly', () => {
//     render(<CreateEvent />);

//     // Fill in form fields
//     const eventTitle = screen.getByPlaceholderText('Event Title');
//     const eventLocation = screen.getByPlaceholderText('Event Venue');
//     const eventCost = screen.getByPlaceholderText('Cost per person');
//     const eventRSVP = screen.getByPlaceholderText('RSVP');
//     const virtualLink = screen.getByPlaceholderText('Virtual Attendance Link');
//     const eventDate = screen.getByPlaceholderText('Event date');
//     const eventTime = screen.getByPlaceholderText('Event time');
//     const eventDuration = screen.getByPlaceholderText('Event duration');
//     const eventDescription = screen.getByPlaceholderText('Description');
//     const transportMode = screen.getByPlaceholderText('Transport mode');
//     const transportCost = screen.getByPlaceholderText('Cost per person');
//     const pickupLocation = screen.getByPlaceholderText('Pickup location');
//     const pickupTime = screen.getByPlaceholderText('Pickup time');
//     const returnTime = screen.getByPlaceholderText('Return time');
//     const travelTime = screen.getByPlaceholderText('Travel time');
//     const seatsAvailable = screen.getByPlaceholderText('Seats Available');
//     const transportDescription = screen.getByPlaceholderText('Descritpion');
//     fireEvent.change(eventTitle, { target: { value: 'Test Event Title' } });
//     fireEvent.change(eventLocation, { target: { value: 'Test Event Location' } });
//     fireEvent.change(eventCost, { target: { value: '10' } });
//     fireEvent.change(eventRSVP, { target: { value: 'Test RSVP' } });
//     fireEvent.change(virtualLink, { target: { value: 'Test Virtual Link' } });
//     fireEvent.change(eventDate, { target: { value: '2022-01-01' } });
//     fireEvent.change(eventTime, { target: { value: '12:00 PM' } });
//     fireEvent.change(eventDuration, { target: { value: '2 hours' } });
//     fireEvent.change(eventDescription, { target: { value: 'Test Event Description' } });
//     fireEvent.change(transportMode, { target: { value: 'Test Transport Mode' } });
//     fireEvent.change(transportCost, { target: { value: '5' } });
//     fireEvent.change(pickupLocation, { target: { value: 'Test Pickup Location' } });
//     fireEvent.change(pickupTime, { target: { value: '11:30 AM' } });
//     fireEvent.change(returnTime, { target: { value: '3:00 PM' } });
//     fireEvent.change(travelTime, { target: { value: '1 hour' } });
//     fireEvent.change(seatsAvailable, { target: { value: '4' } });
//     fireEvent.change(transportDescription, { target: { value: 'Test Transport Description' } });

//     // Submit form
//     const submitButton = screen.getByText('Create Event!');
//     fireEvent.click(submitButton);

//     // Check if form fields are cleared
//     expect(eventTitle).toHaveValue('');
//     expect(eventLocation).toHaveValue('');
//     expect(eventCost).toHaveValue('');
//     expect(eventRSVP).toHaveValue('');
//     expect(virtualLink).toHaveValue('');
//     expect(eventDate).toHaveValue('');
//     expect(eventTime).toHaveValue('');
//     expect(eventDuration).toHaveValue('');
//     expect(eventDescription).toHaveValue('');
//     expect(transportMode).toHaveValue('');
//     expect(transportCost).toHaveValue('');
//     expect(pickupLocation).toHaveValue('');
//     expect(pickupTime).toHaveValue('');
//     expect(returnTime).toHaveValue('');
//     expect(travelTime).toHaveValue('');
//     expect(seatsAvailable).toHaveValue('');
//     expect(transportDescription).toHaveValue('');
//   });
// });
