import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./FlightBooking.css";

const AdminDashboard = () => {
    const bookings = useSelector((state) => state.bookings.bookings);

    const [showFlightList, setShowFlightList] = useState(false);
    const [showEmptyFlightList, setShowEmptyFlightList] = useState(false);
    const [showCloseButton, setShowCloseButton] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [todaysBookings, setTodaysBookings] = useState([]);
    const [flightsWithEmptySeats, setFlightsWithEmptySeats] = useState([]);

    const handleBookingToday = () => {
        const today = new Date().toISOString().split('T')[0];
        const bookingsToday = bookings.filter((booking) => booking.date === today);
        setTodaysBookings(bookingsToday);
        const flights = [...new Set(bookingsToday.map((item) => item.flight.flightNumber))];
        setSelectedFlight(flights);
        setShowFlightList(true);
        setShowCloseButton(true);
    };

    const handleEmptySeatsToday = () => {
        const today = new Date().toISOString().split('T')[0];
        const flightsToday = bookings
            .filter((booking) => booking.date === today)
            .map((booking) => booking.flight);
        console.log("flighttoday", flightsToday)
        const emptySeatsToday = flightsToday.filter((flight) => flight.availableSeats > 0);
        setFlightsWithEmptySeats(emptySeatsToday);
        console.log('Flights with Empty Seats Today:', emptySeatsToday);
        // setShowFlightList(true);
        setShowEmptyFlightList(true);
        setShowCloseButton(true);
    };

    const handleFlightClick = (flight) => {
        setSelectedFlight(flight);
        setShowFlightList(true);
    };

    const handleCloseFlightList = () => {
        setSelectedFlight(null);
        setShowFlightList(false);
        setShowEmptyFlightList(false);
        setShowCloseButton(false);
    };

    return (
        <div className='container'>
            <h2>Admin Dashboard</h2>
            <div className="booking-section button">   
            <button onClick={handleBookingToday}>See number of bookings today</button>
            </div>
            <br />
            <div className="booking-section button">   
            <button onClick={handleEmptySeatsToday}>See empty seats today</button>
</div>
            {showFlightList && (
                <div className="booking-section">
                    <h3>Flight Wise Listing</h3>
                    {selectedFlight && (
                        <>
                            {selectedFlight.map((item, i) => (
                                <div key={i}>
                                    <p>Flight: {item}</p>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
  <thead style={{ backgroundColor: '#f9f9f9' }}>
    <tr>
      <th>Source</th>
      <th>Destination</th>
      <th>Departure Date</th>
      <th>Return Date</th>
      <th>Seat</th>
      <th>Booking Date</th>
    </tr>
  </thead>
  <tbody>
    {todaysBookings
      .filter((booking) => booking.flight.flightNumber === item)
      .map((booking, index) => (
        <tr key={index}>
          <td>{booking.source}</td>
          <td>{booking.destination}</td>
          <td>{booking.departureDate}</td>
          <td>{booking.returnDate}</td>
          <td>{booking.seat}</td>
          <td>{booking.date}</td>
        </tr>
      ))}
  </tbody>
</table>

                                </div>
                            ))}
                        </>
                    )}


                </div>
            )}
            {showEmptyFlightList && (
                <div className="booking-section">
                    <h3>Flights with Empty Seats</h3>
                    <ul>
                        {flightsWithEmptySeats.map((flight, index) => (
                            <li key={index}>
                                Flight Number: {flight.flightNumber} - Available Seats: {flight.availableSeats}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="booking-section button">                   
            {showCloseButton && (<button onClick={handleCloseFlightList}>Close Flight List</button>
            )}
            </div>
        </div>
    );
};

export default AdminDashboard;
