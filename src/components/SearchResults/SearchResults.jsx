import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import CustomerProfile from "@/components/CustomerProfile/CustomerProfile.jsx";
import "./SearchResults.scss";

const SearchResults = (props) => {
  const [nightData, setNightData] = useState([]);
  const [columnForSort, setColumnForSort] = useState(null);
  const [sortOrder, setSortOrder] = useState(null); //this hook state sorts asc or desc and by default order not been set

  //////////////////////////////////
  // Define calculateNights function at the component level
  // `calculationNights` function defined outside of `useEffect` hook state to avoid scope decleration errors
  const calculateNights = (checkInDate, checkOutDate) => {
    const checkInDayjs = dayjs(checkInDate);
    const checkOutDayjs = dayjs(checkOutDate);
    return checkOutDayjs.diff(checkInDayjs, "day");
  };

  // Sorting function based on the selected column and sort order

  const sortResults = (results) => {
    if (!sortOrder) {
      return results;
    }
    return [...results].sort((a, b) => {
      const aValue =
        columnForSort === "numberOfNights"
          ? calculateNights(a.checkInDate, a.checkOutDate)
          : a[columnForSort];
      const bValue =
        columnForSort === "numberOfNights"
          ? calculateNights(b.checkInDate, b.checkOutDate)
          : b[columnForSort];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      } else {
        return 0;
      }
    });
  };

  // handler , when click on each column it should sort the column ascending or descending
  const handleColumnClick = (column) => {
    if (columnForSort === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setColumnForSort(column);
      setSortOrder("asc");
    }
  };

 
  const sortedResults = sortResults(props.results);

  useEffect(() => {
    if (props.results) {
      const nightsArray = props.results.map(({ checkInDate, checkOutDate }) =>
        calculateNights(checkInDate, checkOutDate)
      );
      setNightData(nightsArray);
    }
  }, [props.results]);

  const [selectedCustomerId, setSelectedCustomerId] = useState(0);

  const showProfile = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  if (!props.results || !Array.isArray(props.results)) {
    return <table>No results found</table>;
  }

  return (
    <div>
      <table role="table">
        <thead>
          <tr>
            {/* `handleColumnClick`  passed to each column onlick*/}
            <th onClick={() => handleColumnClick("id")}>ID</th>
            <th onClick={() => handleColumnClick("title")}>Title</th>
            <th onClick={() => handleColumnClick("firstName")}>First Name</th>
            <th onClick={() => handleColumnClick("surname")}>Sur Name</th>
            <th
              onClick={() => {
                handleColumnClick("email");
              }}
            >
              Email
            </th>
            <th onClick={() => handleColumnClick("roomId")}>Room ID</th>
            <th onClick={() => handleColumnClick("checkInDate")}>
              Check In Date
            </th>
            <th onClick={() => handleColumnClick("checkOutDate")}>
              Check Out Date
            </th>
            <th
              onClick={() => {
                handleColumnClick("numberOfNights");
              }}
            >
              Nights
            </th>
            <th>Customer Profile</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map(
            ({
              id,
              title,
              firstName,
              surname,
              email,
              roomId,
              checkInDate,
              checkOutDate,
            }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>{firstName}</td>
                <td>{surname}</td>
                <td>{email}</td>
                <td>{roomId}</td>
                <td>{checkInDate}</td>
                <td>{checkOutDate}</td>
                {/* Add column for nights */}
                <td>{calculateNights(checkInDate, checkOutDate)}</td>
                {/* Add button for customer profile */}
                <td>
                  <button onClick={() => showProfile(id)}>Show Profile</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <CustomerProfile selectedCustomerId={selectedCustomerId} />
    </div>
  );
};

export default SearchResults;
