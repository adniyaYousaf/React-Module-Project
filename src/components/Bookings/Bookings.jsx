import React, { useState, useEffect } from "react";
import Search from "@/components/Search/Search";
import SearchResults from "@/components/SearchResults/SearchResults.jsx";
import "./Bookings.scss";

const Bookings = () => {
  const [totalBooking, setTotalBooking] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newBooking, setNewBooking] = useState({
    firstName: "",
    surname: "",
    email: "",
    title: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const capitalizeFirstChar = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleInputChange = (e, fieldName) => {
    const updatedValue = capitalizeFirstChar(e.target.value);
    setNewBooking({ ...newBooking, [fieldName]: updatedValue });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://cyf-hotel-api.netlify.app/");
        const data = await response.json();
        setLoading(true);
        setTotalBooking(data);
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings data:", error);
      }
    };
    fetchData();
  }, [loading]);

  const search = (searchVal) => {
    setBookings(
      totalBooking.filter((item) =>
        item.firstName.toLowerCase().includes(searchVal)
      )
    );
  };
  function handleRefresh() {
    setBookings(totalBooking);
  }
  const bookingSubmit = (e) => {
    e.preventDefault();

    const isRoomAlreadyBooked = bookings.some(
      (booking) => booking.roomId === newBooking.roomId
    );

    if (isRoomAlreadyBooked) {
      alert("This room is already booked. Please choose another room.");
      return;
    }

    const requiredFields = [
      "firstName",
      "surname",
      "email",
      "roomId",
      "checkInDate",
      "checkOutDate",
    ];
    if (requiredFields.some((field) => !newBooking[field])) {
      alert("Please fill in all required fields.");
      return;
    }

    const newId = Math.max(...bookings.map((booking) => booking.id), 0) + 1;

    const newBookingWithId = { ...newBooking, id: newId };

    setBookings([...bookings, newBookingWithId]);

    setNewBooking({
      firstName: "",
      surname: "",
      email: "",
      title: "",
      roomId: "",
      checkInDate: "",
      checkOutDate: "",
    });
    closeModal();
  };

  return (
    <>
      <main className="bookings">
        <Search search={search} loading={handleRefresh} />
        <section className="content">
          <SearchResults results={bookings} />
        </section>
        <button className="open-modal-button" onClick={openModal}>
          Book new customer
        </button>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="container">
                <form onSubmit={bookingSubmit} className="form_column">
                  <label className="form-input">
                    <span className="form-label">Title</span>
                    <input
                      className="form-field"
                      type="text"
                      name="title"
                      value={newBooking.title}
                      onChange={(e) => handleInputChange(e, "title")}
                    />
                  </label>
                  <label className="form-input">
                    <span className="form-label">First Name:</span>
                    <input
                      className="form-field"
                      type="text"
                      name="firstName"
                      value={newBooking.firstName}
                      onChange={(e) => handleInputChange(e, "firstName")}
                      required
                    />
                  </label>
                  <label className="form-input">
                    <span className="form-label">Surname:</span>
                    <input
                      className="form-field"
                      type="text"
                      name="surname"
                      value={newBooking.surname}
                      onChange={(e) => handleInputChange(e, "surname")}
                      required
                    />
                  </label>
                  <label className="form-input">
                    <span className="form-label">Email:</span>
                    <input
                      className="form-field"
                      type="email"
                      name="email"
                      value={newBooking.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                    />
                  </label>
                  <label className="form-input">
                    <span className="form-label">Room ID:</span>
                    <input
                      className="form-field"
                      type="number"
                      name="roomId"
                      value={newBooking.roomId}
                      onChange={(e) => handleInputChange(e, "roomId")}
                      min="0"
                      max="100"
                    />
                  </label>
                  <label className="form-input">
                    <span className="form-label">Check In Date:</span>
                    <input
                      className="form-field"
                      type="date"
                      name="checkInDate"
                      value={newBooking.checkInDate}
                      onChange={(e) => handleInputChange(e, "checkInDate")}
                    />
                  </label>
                  <label className="form-input">
                    <span className="form-label">Check Out Date:</span>
                    <input
                      className="form-field"
                      type="date"
                      name="checkOutDate"
                      value={newBooking.checkOutDate}
                      onChange={(e) => handleInputChange(e, "checkOutDate")}
                    />
                  </label>
                  <button
                    data-testid="newBooking"
                    className="submit_button"
                    type="submit"
                  >
                    Confirm booking
                  </button>
                </form>
                <img class="form_img" src="assets/spa-logo.png"></img>
              </div>
            </div>

            <button className="close-modal-button" onClick={closeModal}>
              x
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Bookings;
