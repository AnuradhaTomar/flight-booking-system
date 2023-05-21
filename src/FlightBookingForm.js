import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBooking } from './bookingAction';
import { json } from 'react-router-dom';
import "./FlightBooking.css"


const FlightBookingForm = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [flightResults, setFlightResults] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);

    const handleFlightSearch = (e) => {
        e.preventDefault();
        const searchResults = [
            { id: 1, flightNumber: 'ABC123', seats: 100, availableSeats: 50 },
            { id: 2, flightNumber: 'XYZ789', seats: 120, availableSeats: 80 },
        ];
        setFlightResults(searchResults);
    };

    const handleFlightSelection = (flight) => {
        setSelectedFlight(flight);
    };

    const handleSeatSelection = (seat) => {
        setSelectedSeat(seat);
    };

    const dispatch = useDispatch();

    const handleBookingSubmit = () => {
        // Handle booking submission logic here
        if (selectedFlight && selectedSeat) {
            alert("Booking is confirmed");
            const date = new Date().toISOString().split('T')[0];
            dispatch(addBooking({ flight: selectedFlight, seat: selectedSeat, date: date, source: origin, destination: destination, departureDate: departureDate, returnDate: returnDate }));
        } else {
            // Either selectedFlight or selectedSeat is missing, display an error or handle the validation failure
            console.log('Please select a flight and seat');
            // You can also set an error state and display an error message to the user
        }
        // dispatch(addBooking({ flight: selectedFlight, seat: selectedSeat }));
    };

    return (
        <div className="container">
          <h2>Flight Booking</h2>
          <form onSubmit={handleFlightSearch}>
            <label>
              Origin:
              <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
            </label>
            <br />
            <label>
              Destination:
              <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
            </label>
            <br />
            <label>
              Departure Date:
              <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
            </label>
            <br />
            <label>
              Return Date:
              <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
            </label>
            <br />
            <button type="submit">Search Flights</button>
          </form>
    
          {flightResults.length > 0 && (
            <div className="booking-section">
              <h3>Flight Results</h3>
              <ul>
                {flightResults.map((flight) => (
                  <li key={flight.id}>
                    Flight Number: {flight.flightNumber}
                    <br />
                    Available Seats: {flight.availableSeats} / {flight.seats}
                    <br />
                    <button onClick={() => handleFlightSelection(flight)}>Select Flight</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
    
          {selectedFlight && (
            <div className="booking-section">
              <h3>Seat Selection</h3>
              <p>Selected Flight: {selectedFlight.flightNumber}</p>
              <div>
                <p>Available Seats:{selectedFlight.availableSeats}</p>
                <ul>
                  <li>
                    Seat 1 <button onClick={() => handleSeatSelection('seat1')}>Select</button>
                  </li>
                  <li>
                    Seat 2 <button onClick={() => handleSeatSelection('seat2')}>Select</button>
                  </li>
                  {/* ... more seat options */}
                </ul>
              </div>
            </div>
          )}
    
          {selectedSeat && (
            <div className="booking-section">
              <h3>Booking Confirmation</h3>
              <p>Selected Seat: {selectedSeat}</p>
              <button onClick={handleBookingSubmit}>Confirm Booking</button>
            </div>
          )}
        </div>
      );
    };

export default FlightBookingForm;
