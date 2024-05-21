import Search from "@/components/Search/Search";
import SearchResults from "@/components/SearchResult/SearchResults.jsx";
import { useState } from "react";
import Restaurant from "../Restaurant/Restaurant";
import { useEffect } from "react";


const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://cyf-hotel-api.netlify.app/"
        );
        if (response.ok) {
          const jsonData = await response.json();
          setBookings(jsonData);
        }
      } catch (error) {
        console.error("Error fetching data from the server", error);
      }
    };
    fetchData();
    // Log text when the component first renders
    console.log("Component has rendered!");
  }, []);

  const search = (searchVal) => {
    setBookings(
      bookings.filter((item) =>
        item.firstName.toLowerCase().includes(searchVal)
      )
    );
  };

  return (
    <main className="bookings">
      <Search search={search} />
      <SearchResults data={bookings} />
      <Restaurant />
    </main>
  );
};

export default Bookings;
